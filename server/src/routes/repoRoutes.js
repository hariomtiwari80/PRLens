const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getRepositories,
  getRepository,
  getRepositoryPulls,
  getRepositoryCommits,
  getRepositoryContributors,
} = require("../controllers/repoController");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getRepositories);

router.get(
  "/:owner/:repo",
  getRepository
);

router.get(
  "/:owner/:repo/pulls",
  getRepositoryPulls
);

router.get(
  "/:owner/:repo/commits",
  getRepositoryCommits
);

router.get(
  "/:owner/:repo/contributors",
  getRepositoryContributors
);

module.exports = router;