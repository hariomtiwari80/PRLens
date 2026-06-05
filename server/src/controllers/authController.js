const axios = require("axios");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const githubLogin = (req, res) => {
  const url = new URL(
    "https://github.com/login/oauth/authorize"
  );

  url.searchParams.append(
    "client_id",
    process.env.GITHUB_CLIENT_ID
  );

  url.searchParams.append(
    "scope",
    "read:user user:email"
  );

  res.redirect(url.toString());
};

const githubCallback = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Authorization code is required",
      });
    }

    const { data: tokenData } = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const accessToken = tokenData.access_token;

    const { data: githubUser } = await axios.get(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    let email = githubUser.email;

    if (!email) {
      try {
        const { data } = await axios.get(
          "https://api.github.com/user/emails",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const primary = data.find(
          (item) => item.primary
        );

        email = primary?.email || null;
      } catch {
        email = null;
      }
    }

    let user = await User.findOne({
      githubId: String(githubUser.id),
    });

    if (!user) {
      user = await User.create({
        githubId: String(githubUser.id),
        username: githubUser.login,
        name: githubUser.name || githubUser.login,
        email,
        avatar: githubUser.avatar_url,
        accessToken,
      });
    } else {
      user.username = githubUser.login;
      user.name = githubUser.name || githubUser.login;
      user.email = email;
      user.avatar = githubUser.avatar_url;
      user.accessToken = accessToken;

      await user.save();
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.redirect(
      `${process.env.CLIENT_URL}/dashboard`
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

const getCurrentUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

const logoutUser = async (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = {
  githubLogin,
  githubCallback,
  getCurrentUser,
  logoutUser,
};