const express = require("express");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  getAnalytics,
  getActivityAnalytics,
  getPerformanceAnalytics,
} = require("../controllers/analyticsController");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAnalytics);

router.get(
  "/activity",
  getActivityAnalytics
);

router.get(
  "/performance",
  getPerformanceAnalytics
);

module.exports = router;