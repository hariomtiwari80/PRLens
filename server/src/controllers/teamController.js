const axios = require("axios");

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  timeout: 15000,
});

const getHeaders = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`,
  Accept: "application/vnd.github+json",
});

const getTeamOverview = async (req, res) => {
  try {
    const { accessToken } = req.user;

    const { data: repos } = await githubApi.get(
      "/user/repos",
      {
        headers: getHeaders(accessToken),
        params: {
          per_page: 100,
        },
      }
    );

    let contributors = new Set();
    let commits = 0;
    let pullRequests = 0;

    await Promise.all(
      repos.slice(0, 15).map(async (repo) => {
        try {
          const [contributorsRes, commitsRes, pullsRes] =
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
                `/repos/${repo.owner.login}/${repo.name}/commits`,
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

          contributorsRes.data.forEach((user) =>
            contributors.add(user.login)
          );

          commits += commitsRes.data.length;
          pullRequests += pullsRes.data.length;
        } catch {}
      })
    );

    return res.status(200).json({
      contributors: contributors.size,
      commits,
      pullRequests,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch team overview",
    });
  }
};

const getContributors = async (req, res) => {
  try {
    const { accessToken } = req.user;

    const { data: repos } = await githubApi.get(
      "/user/repos",
      {
        headers: getHeaders(accessToken),
        params: {
          per_page: 50,
        },
      }
    );

    const contributorMap = {};

    await Promise.all(
      repos.slice(0, 10).map(async (repo) => {
        try {
          const [contributorsRes, pullsRes] =
            await Promise.all([
              githubApi.get(
                `/repos/${repo.owner.login}/${repo.name}/contributors`,
                {
                  headers: getHeaders(accessToken),
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

          contributorsRes.data.forEach((user) => {
            if (!contributorMap[user.login]) {
              contributorMap[user.login] = {
                name: user.login,
                commits: 0,
                pullRequests: 0,
              };
            }

            contributorMap[user.login].commits +=
              user.contributions;
          });

          pullsRes.data.forEach((pull) => {
            const login = pull.user.login;

            if (!contributorMap[login]) {
              contributorMap[login] = {
                name: login,
                commits: 0,
                pullRequests: 0,
              };
            }

            contributorMap[login].pullRequests += 1;
          });
        } catch {}
      })
    );

    return res.status(200).json(
      Object.values(contributorMap)
        .sort(
          (a, b) =>
            b.commits - a.commits
        )
        .slice(0, 20)
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch contributors",
    });
  }
};

const getTeamActivity = async (req, res) => {
  try {
    const { accessToken } = req.user;

    const { data: repos } = await githubApi.get(
      "/user/repos",
      {
        headers: getHeaders(accessToken),
        params: {
          sort: "updated",
          per_page: 10,
        },
      }
    );

    const activities = [];

    await Promise.all(
      repos.slice(0, 5).map(async (repo) => {
        try {
          const { data: commits } =
            await githubApi.get(
              `/repos/${repo.owner.login}/${repo.name}/commits`,
              {
                headers: getHeaders(accessToken),
                params: {
                  per_page: 10,
                },
              }
            );

          commits.forEach((commit) => {
            activities.push({
              activity: `${commit.commit.author.name} committed to ${repo.name}`,
              time: new Date(
                commit.commit.author.date
              ).toLocaleString(),
            });
          });
        } catch {}
      })
    );

    activities.sort(
      (a, b) =>
        new Date(b.time) -
        new Date(a.time)
    );

    return res.status(200).json(
      activities.slice(0, 20)
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch activity",
    });
  }
};

module.exports = {
  getTeamOverview,
  getContributors,
  getTeamActivity,
};