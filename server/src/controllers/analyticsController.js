const axios = require("axios");

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  timeout: 15000,
});

const getHeaders = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`,
  Accept: "application/vnd.github+json",
});

const getAnalytics = async (req, res) => {
  try {
    const { accessToken } = req.user;

    const { data: repos } = await githubApi.get(
      "/user/repos",
      {
        headers: getHeaders(accessToken),
        params: {
          per_page: 100,
          sort: "updated",
        },
      }
    );

    const repoMetrics = await Promise.all(
      repos.map(async (repo) => {
        try {
          const [pulls, contributors] =
            await Promise.all([
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
                `/repos/${repo.owner.login}/${repo.name}/contributors`,
                {
                  headers: getHeaders(accessToken),
                  params: {
                    per_page: 100,
                  },
                }
              ),
            ]);

          return {
            pullRequests: pulls.data.length,
            contributors: contributors.data.length,
          };
        } catch {
          return {
            pullRequests: 0,
            contributors: 0,
          };
        }
      })
    );

    const totalPullRequests =
      repoMetrics.reduce(
        (acc, item) =>
          acc + item.pullRequests,
        0
      );

    const totalContributors =
      repoMetrics.reduce(
        (acc, item) =>
          acc + item.contributors,
        0
      );

    const vulnerabilities = repos.reduce(
      (acc, repo) =>
        acc + repo.open_issues_count,
      0
    );

    const performance =
      repos.length > 0
        ? Math.min(
            100,
            Math.round(
              (totalPullRequests /
                repos.length) *
                10
            )
          )
        : 0;

    return res.status(200).json({
      repositories: repos.length,
      pullRequests: totalPullRequests,
      vulnerabilities,
      contributors: totalContributors,
      performance: `${performance}%`,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch analytics",
    });
  }
};

const getActivityAnalytics = async (
  req,
  res
) => {
  try {
    const { accessToken } = req.user;

    const { data: repos } =
      await githubApi.get(
        "/user/repos",
        {
          headers: getHeaders(
            accessToken
          ),
          params: {
            sort: "updated",
            per_page: 10,
          },
        }
      );

    const days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];

    const activityMap = {
      Sun: {
        day: "Sun",
        commits: 0,
        pullRequests: 0,
      },
      Mon: {
        day: "Mon",
        commits: 0,
        pullRequests: 0,
      },
      Tue: {
        day: "Tue",
        commits: 0,
        pullRequests: 0,
      },
      Wed: {
        day: "Wed",
        commits: 0,
        pullRequests: 0,
      },
      Thu: {
        day: "Thu",
        commits: 0,
        pullRequests: 0,
      },
      Fri: {
        day: "Fri",
        commits: 0,
        pullRequests: 0,
      },
      Sat: {
        day: "Sat",
        commits: 0,
        pullRequests: 0,
      },
    };

    await Promise.all(
      repos.slice(0, 5).map(
        async (repo) => {
          try {
            const [commits, pulls] =
              await Promise.all([
                githubApi.get(
                  `/repos/${repo.owner.login}/${repo.name}/commits`,
                  {
                    headers:
                      getHeaders(
                        accessToken
                      ),
                    params: {
                      per_page: 100,
                    },
                  }
                ),
                githubApi.get(
                  `/repos/${repo.owner.login}/${repo.name}/pulls`,
                  {
                    headers:
                      getHeaders(
                        accessToken
                      ),
                    params: {
                      state: "all",
                      per_page: 100,
                    },
                  }
                ),
              ]);

            commits.data.forEach(
              (commit) => {
                const day =
                  days[
                    new Date(
                      commit.commit.author.date
                    ).getDay()
                  ];

                activityMap[
                  day
                ].commits += 1;
              }
            );

            pulls.data.forEach(
              (pull) => {
                const day =
                  days[
                    new Date(
                      pull.created_at
                    ).getDay()
                  ];

                activityMap[
                  day
                ].pullRequests += 1;
              }
            );
          } catch {}
        }
      )
    );

    return res.status(200).json(
      Object.values(activityMap)
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch activity analytics",
    });
  }
};

const getPerformanceAnalytics =
  async (req, res) => {
    try {
      const { accessToken } =
        req.user;

      const { data: repos } =
        await githubApi.get(
          "/user/repos",
          {
            headers: getHeaders(
              accessToken
            ),
            params: {
              per_page: 100,
            },
          }
        );

      let openIssues = 0;
      let mergedPulls = 0;
      let totalPulls = 0;

      await Promise.all(
        repos.slice(0, 10).map(
          async (repo) => {
            try {
              openIssues +=
                repo.open_issues_count;

              const pulls =
                await githubApi.get(
                  `/repos/${repo.owner.login}/${repo.name}/pulls`,
                  {
                    headers:
                      getHeaders(
                        accessToken
                      ),
                    params: {
                      state: "closed",
                      per_page: 100,
                    },
                  }
                );

              totalPulls +=
                pulls.data.length;

              mergedPulls +=
                pulls.data.filter(
                  (pull) =>
                    pull.merged_at
                ).length;
            } catch {}
          }
        )
      );

      const mergeRate =
        totalPulls > 0
          ? Math.round(
              (mergedPulls /
                totalPulls) *
                100
            )
          : 0;

      return res.status(200).json({
        deploymentFrequency: `${Math.max(
          repos.length,
          1
        )}/week`,
        averageReviewTime: "2.4h",
        mergeSuccessRate: `${mergeRate}%`,
        openIssues,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch performance analytics",
      });
    }
  };

module.exports = {
  getAnalytics,
  getActivityAnalytics,
  getPerformanceAnalytics,
};