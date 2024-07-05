// routes/integrations.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Middleware for safe authentication
router.use((req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "No token provided" });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(500).json({ message: "Failed to authenticate token" });
    req.userId = decoded.userId;
    next();
  });
});

router.post("/enable", async (req, res) => {
  const { integrationType, options } = req.body;
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.integrations[integrationType] = true;
  if (options) user.integrations[`${integrationType}Options`] = options;

  await user.save();
  res.json({ message: `${integrationType} integration enabled` });
});

router.get("/config", async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ integrations: user.integrations });
});

module.exports = router;
