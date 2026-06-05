const axios = require("axios");

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  timeout: 15000,
});

const getHeaders = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`,
  Accept: "application/vnd.github+json",
});

const getReports = async (req, res) => {
  try {
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

    const reports = await Promise.all(
      repos.slice(0, 20).map(async (repo, index) => {
        try {
          const [contributors, pulls] =
            await Promise.all([
              githubApi.get(
                `/repos/${repo.owner.login}/${repo.name}/contributors`,
                {
                  headers: getHeaders(accessToken),
                  params: {
                    per_page: 100,
                  },
                }
              ),
              githubApi.get(
                `/repos/${repo.owner.login}/${repo.name}/pulls`,
                {
                  headers: getHeaders(accessToken),
                  params: {
                    state: "all",
                    per_page: 100,
                  },
                }
              ),
            ]);

          return {
            id: repo.id || index + 1,
            title: `${repo.name} Engineering Report`,
            status:
              repo.archived
                ? "Archived"
                : "Completed",
            repository: repo.name,
            contributors:
              contributors.data.length,
            pullRequests:
              pulls.data.length,
            stars:
              repo.stargazers_count,
            issues:
              repo.open_issues_count,
            updatedAt:
              repo.updated_at,
          };
        } catch {
          return {
            id: repo.id || index + 1,
            title: `${repo.name} Engineering Report`,
            status: "Completed",
          };
        }
      })
    );

    return res.status(200).json(reports);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reports",
    });
  }
};

module.exports = {
  getReports,
};