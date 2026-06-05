const express = require("express");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  getTeamOverview,
  getContributors,
  getTeamActivity,
} = require("../controllers/teamController");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getTeamOverview
);

router.get(
  "/contributors",
  authMiddleware,
  getContributors
);

router.get(
  "/activity",
  authMiddleware,
  getTeamActivity
);

module.exports = router;