const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    console.log("========== AUTH ==========");
    console.log("Cookies:", req.cookies);
    console.log("Cookie Header:", req.headers.cookie);

    const token = req.cookies?.token;

    console.log("Token:", token);

    if (!token) {
      console.log("NO TOKEN FOUND");
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded:", decoded);

    const user = await User.findById(
      decoded.userId
    );

    console.log("User Found:", !!user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;