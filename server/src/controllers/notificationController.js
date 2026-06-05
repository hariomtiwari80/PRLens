const axios = require("axios");

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  timeout: 15000,
});

const getHeaders = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`,
  Accept: "application/vnd.github+json",
});

const getNotifications = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { accessToken } = req.user;

    const { data: repos } = await githubApi.get(
      "/user/repos",
      {
        headers: getHeaders(accessToken),
        params: {
          sort: "updated",
          per_page: 20,
        },
      }
    );

    const notifications = [];

    await Promise.all(
      repos.slice(0, 10).map(async (repo) => {
        try {
          const [pulls, issues] =
            await Promise.all([
              githubApi.get(
                `/repos/${repo.owner.login}/${repo.name}/pulls`,
                {
                  headers: getHeaders(accessToken),
                  params: {
                    state: "open",
                    per_page: 10,
                  },
                }
              ),
              githubApi.get(
                `/repos/${repo.owner.login}/${repo.name}/issues`,
                {
                  headers: getHeaders(accessToken),
                  params: {
                    state: "open",
                    per_page: 10,
                  },
                }
              ),
            ]);

          pulls.data.forEach((pull) => {
            notifications.push({
              id: pull.id,
              title: `Pull Request Opened: ${pull.title}`,
              time: new Date(
                pull.created_at
              ).toLocaleString(),
            });
          });

          issues.data.forEach((issue) => {
            notifications.push({
              id: issue.id,
              title: `Issue Reported: ${issue.title}`,
              time: new Date(
                issue.created_at
              ).toLocaleString(),
            });
          });
        } catch {}
      })
    );

    notifications.sort(
      (a, b) =>
        new Date(b.time) -
        new Date(a.time)
    );

    return res.status(200).json(
      notifications.slice(0, 30)
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch notifications",
    });
  }
};

module.exports = {
  getNotifications,
};