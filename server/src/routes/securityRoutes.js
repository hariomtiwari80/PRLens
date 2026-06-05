const express = require("express");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  getSecurityOverview,
  getVulnerabilities,
} = require(
  "../controllers/securityController"
);

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getSecurityOverview
);

router.get(
  "/vulnerabilities",
  authMiddleware,
  getVulnerabilities
);

module.exports = router;