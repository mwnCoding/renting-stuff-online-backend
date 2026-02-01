const User = require("../models/User.model");
const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

router.get("/:userId", isAuthenticated, async (req, res) => {
  const { userId } = req.params;
  if (req.payload.userId !== userId)
    return res.status(401).json({ error: "User not Unauthorized" });
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user." });
  }
});

router.put("/upload/:id", isAuthenticated, async (req, res, next) => {
  const userId = req.params.id;
  if (req.payload.userId !== userId)
    return res.status(401).json({ error: "User not Unauthorized" });
  const updatedUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    imageUrl: req.body.imageUrl,
  };
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log("user not found");
      return res.status(404).json({ error: "User not found" });
    }
    const response = await User.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });
    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// Update an existing user
router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;
  if (req.payload.userId !== userId)
    return res.status(401).json({ error: "User not Unauthorized" });
  try {
    const user = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "User update failed." });
  }
});

module.exports = router;
