const express = require("express");
const {
  githubLogin,
  githubCallback,
  getCurrentUser,
  logoutUser,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/github", githubLogin);
router.get("/github/callback", githubCallback);

router.get("/me", authMiddleware, getCurrentUser);

router.post("/logout", authMiddleware, logoutUser);

module.exports = router;