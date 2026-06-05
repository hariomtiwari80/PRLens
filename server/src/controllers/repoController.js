const axios = require("axios");

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  timeout: 15000,
});

const getHeaders = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`,
  Accept: "application/vnd.github+json",
});

const getRepositories = async (req, res) => {
  try {
    const { accessToken } = req.user;

    const { data } = await githubApi.get("/user/repos", {
      headers: getHeaders(accessToken),
      params: {
        sort: "updated",
        direction: "desc",
        per_page: 100,
      },
    });

    const repositories = data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      private: repo.private,
      visibility: repo.visibility,
      defaultBranch: repo.default_branch,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      openIssues: repo.open_issues_count,
      size: repo.size,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      pushedAt: repo.pushed_at,
      htmlUrl: repo.html_url,
      owner: {
        login: repo.owner.login,
        avatar: repo.owner.avatar_url,
      },
    }));

    return res.status(200).json({
      success: true,
      count: repositories.length,
      repositories,
    });
  } catch (error) {
    console.error(error.response?.data || error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch repositories",
    });
  }
};

const getRepository = async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const { accessToken } = req.user;

    const { data } = await githubApi.get(
      `/repos/${owner}/${repo}`,
      {
        headers: getHeaders(accessToken),
      }
    );

    return res.status(200).json({
      success: true,
      repository: data,
    });
  } catch (error) {
    console.error(error.response?.data || error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch repository",
    });
  }
};

const getRepositoryPulls = async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const { accessToken } = req.user;

    const { data } = await githubApi.get(
      `/repos/${owner}/${repo}/pulls`,
      {
        headers: getHeaders(accessToken),
        params: {
          state: "all",
          per_page: 100,
        },
      }
    );

    const pulls = data.map((pull) => ({
      id: pull.id,
      number: pull.number,
      title: pull.title,
      state: pull.state,
      merged: pull.merged_at !== null,
      createdAt: pull.created_at,
      updatedAt: pull.updated_at,
      closedAt: pull.closed_at,
      htmlUrl: pull.html_url,
      user: {
        login: pull.user.login,
        avatar: pull.user.avatar_url,
      },
    }));

    return res.status(200).json({
      success: true,
      count: pulls.length,
      pulls,
    });
  } catch (error) {
    console.error(error.response?.data || error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch pull requests",
    });
  }
};

const getRepositoryCommits = async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const { accessToken } = req.user;

    const { data } = await githubApi.get(
      `/repos/${owner}/${repo}/commits`,
      {
        headers: getHeaders(accessToken),
        params: {
          per_page: 100,
        },
      }
    );

    const commits = data.map((commit) => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author?.name,
      email: commit.commit.author?.email,
      date: commit.commit.author?.date,
      htmlUrl: commit.html_url,
    }));

    return res.status(200).json({
      success: true,
      count: commits.length,
      commits,
    });
  } catch (error) {
    console.error(error.response?.data || error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch commits",
    });
  }
};

const getRepositoryContributors = async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const { accessToken } = req.user;

    const { data } = await githubApi.get(
      `/repos/${owner}/${repo}/contributors`,
      {
        headers: getHeaders(accessToken),
        params: {
          per_page: 100,
        },
      }
    );

    const contributors = data.map((contributor) => ({
      id: contributor.id,
      login: contributor.login,
      avatar: contributor.avatar_url,
      contributions: contributor.contributions,
      profileUrl: contributor.html_url,
    }));

    return res.status(200).json({
      success: true,
      count: contributors.length,
      contributors,
    });
  } catch (error) {
    console.error(error.response?.data || error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch contributors",
    });
  }
};

module.exports = {
  getRepositories,
  getRepository,
  getRepositoryPulls,
  getRepositoryCommits,
  getRepositoryContributors,
};