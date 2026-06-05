const express = require("express");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  githubLogin,
  githubCallback,
  getCurrentUser,
  logoutUser,
} = require(
  "../controllers/authController"
);

const router = express.Router();

router.get(
  "/github",
  githubLogin
);

router.get(
  "/github/callback",
  githubCallback
);

router.get(
  "/me",
  authMiddleware,
  getCurrentUser
);

router.post(
  "/logout",
  authMiddleware,
  logoutUser
);

module.exports = router;