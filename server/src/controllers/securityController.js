const axios = require("axios");

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  timeout: 15000,
});

const getHeaders = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`,
  Accept: "application/vnd.github+json",
});

const getSecurityOverview = async (req, res) => {
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

    let critical = 0;
    let medium = 0;
    let low = 0;

    const secureRepositories = repos.filter(
      (repo) => repo.open_issues_count === 0
    ).length;

    await Promise.all(
      repos.slice(0, 20).map(async (repo) => {
        try {
          const { data: alerts } =
            await githubApi.get(
              `/repos/${repo.owner.login}/${repo.name}/dependabot/alerts`,
              {
                headers: getHeaders(accessToken),
              }
            );

          alerts.forEach((alert) => {
            const severity =
              alert.security_advisory?.severity;

            if (severity === "critical") critical++;
            else if (
              severity === "high" ||
              severity === "medium"
            )
              medium++;
            else low++;
          });
        } catch {}
      })
    );

    return res.status(200).json({
      critical,
      medium,
      low,
      secureRepositories,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch security overview",
    });
  }
};

const getVulnerabilities = async (req, res) => {
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

    const vulnerabilities = [];

    await Promise.all(
      repos.slice(0, 20).map(async (repo) => {
        try {
          const { data: alerts } =
            await githubApi.get(
              `/repos/${repo.owner.login}/${repo.name}/dependabot/alerts`,
              {
                headers: getHeaders(accessToken),
              }
            );

          alerts.forEach((alert) => {
            vulnerabilities.push({
              title:
                alert.security_advisory?.summary ||
                "Security Alert",
              severity:
                alert.security_advisory?.severity ||
                "Low",
              package:
                alert.dependency?.package?.name ||
                "Unknown",
            });
          });
        } catch {}
      })
    );

    return res.status(200).json(
      vulnerabilities
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch vulnerabilities",
    });
  }
};

module.exports = {
  getSecurityOverview,
  getVulnerabilities,
};