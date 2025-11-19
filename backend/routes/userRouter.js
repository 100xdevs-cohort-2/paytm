const express = require("express");
const User = require("../Models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;
// POST /api/v1/user/register - Create new user
router.post("/register", async (req, res) => {
  try {
    const { username, password, firstName, lastName } = req.body;

    // Validation
    if (!username || !password || !firstName) {
      return res.status(400).json({
        error: "Username, password, and first name are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters long",
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username.trim(),
      password: hashedPassword,
      firstName: firstName.trim(),
      lastName: lastName?.trim() || "",
    });

    await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      SECRET_KEY,
      { expiresIn: "24h" } // token expires in 24 hours
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: {
        id: newUser._id,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      error: "Failed to create user",
      details: error.message,
    });
  }
});

// POST /api/v1/user/login - User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password are required",
      });
    }

    // Check if user exists
    const user = await User.findOne({ username: username.trim() });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    // Compare entered password with hashed password in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    // Send success response
    res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Login failed!",
      details: error.message,
    });
  }
});

// PATCH /api/v1/user/edit - Update user information
router.patch("/edit", authMiddleware, async (req, res) => {
  try {
    const { newUsername, firstName, lastName } = req.body;
    const userId = req.user.id;

    // Build update object
    const updateData = {};
    if (newUsername) updateData.username = newUsername.trim();
    if (firstName) updateData.firstName = firstName.trim();
    if (lastName !== undefined) updateData.lastName = lastName.trim();

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        error: "At least one field to update is required",
      });
    }

    // Check if username is being changed and if it's already taken
    if (updateData.username) {
      const existingUser = await User.findOne({
        username: updateData.username,
        _id: { $ne: userId },
      });
      if (existingUser) {
        return res.status(400).json({
          error: "Username already taken",
        });
      }
    }

    // Update user in DB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Remove password from response
    const userResponse = {
      id: updatedUser._id,
      username: updatedUser.username,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
    };

    res.status(200).json({
      message: "User updated successfully!",
      user: userResponse,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      error: "Failed to update user",
      details: error.message,
    });
  }
});

// GET /api/v1/user/bulk - Get all users (for search/transfer)
router.get("/bulk", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Bulk fetch error:", error);
    res.status(500).json({
      error: "Failed to fetch users",
      details: error.message,
    });
  }
});

// GET /api/v1/user/me - Get current user profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({
      error: "Failed to fetch profile",
      details: error.message,
    });
  }
});

module.exports = router;
