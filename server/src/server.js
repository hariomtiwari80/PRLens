require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const repoRoutes = require("./routes/repoRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const assistantRoutes = require("./routes/assistantRoutes");
const securityRoutes = require("./routes/securityRoutes");
const teamRoutes = require("./routes/teamRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const reportRoutes = require("./routes/reportRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/repos", repoRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/assistant", assistantRoutes);
app.use("/api/security", securityRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("PRLens API Running");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PRLens API Running",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});