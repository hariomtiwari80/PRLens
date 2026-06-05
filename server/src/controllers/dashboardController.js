const axios = require("axios");

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  timeout: 15000,
});

const getHeaders = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`,
  Accept: "application/vnd.github+json",
});

const getDashboard = async (req, res) => {
  try {
    const { accessToken } = req.user;

    const [userResponse, reposResponse] =
      await Promise.all([
        githubApi.get("/user", {
          headers: getHeaders(accessToken),
        }),
        githubApi.get("/user/repos", {
          headers: getHeaders(accessToken),
          params: {
            per_page: 100,
            sort: "updated",
          },
        }),
      ]);

    const user = userResponse.data;
    const repos = reposResponse.data;

    let totalPullRequests = 0;
    let totalCommits = 0;
    let contributorsSet = new Set();

    const recentRepositories = repos
      .slice(0, 6)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        issues: repo.open_issues_count,
        updatedAt: repo.updated_at,
        url: repo.html_url,
      }));

    const recentActivity = [];

    await Promise.all(
      repos.slice(0, 10).map(async (repo) => {
        try {
          const [
            pullsResponse,
            commitsResponse,
            contributorsResponse,
          ] = await Promise.all([
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
              `/repos/${repo.owner.login}/${repo.name}/contributors`,
              {
                headers: getHeaders(accessToken),
                params: {
                  per_page: 100,
                },
              }
            ),
          ]);

          totalPullRequests +=
            pullsResponse.data.length;

          totalCommits +=
            commitsResponse.data.length;

          contributorsResponse.data.forEach(
            (contributor) => {
              contributorsSet.add(
                contributor.login
              );
            }
          );

          commitsResponse.data
            .slice(0, 3)
            .forEach((commit) => {
              recentActivity.push({
                repository: repo.name,
                message:
                  commit.commit.message,
                author:
                  commit.commit.author?.name,
                date:
                  commit.commit.author?.date,
              });
            });
        } catch {}
      })
    );

    recentActivity.sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    );

    return res.status(200).json({
      success: true,

      user: {
        id: user.id,
        login: user.login,
        name: user.name,
        avatar: user.avatar_url,
        email: user.email,
        profileUrl: user.html_url,
      },

      overview: {
        repositories: repos.length,
        pullRequests: totalPullRequests,
        contributors:
          contributorsSet.size,
        commits: totalCommits,
      },

      repositories:
        recentRepositories,

      activity:
        recentActivity.slice(0, 15),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch dashboard data",
    });
  }
};

module.exports = {
  getDashboard,
};