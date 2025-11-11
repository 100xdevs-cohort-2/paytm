const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User } = require("../db");
const { Account } = require("../db");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middlewares");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
  try {
    const { success } = signupSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res
        .status(411)
        .json({ message: "Email already taken/Incorrect inputs" });
    }

    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const userId = user._id;

    await Account.create({
      userId: userId,
      balance: Math.random() * 10000 + 1,
    });
    res.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in signup route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const signinSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: "Invalid data" });
  }
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    try {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        token: token,
        name: user.firstName,
        id: user._id,
      });
      return;
    } catch (error) {
      console.error("Error generating token:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const updateBodySchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/update", authMiddleware, async (req, res) => {
  const { success } = updateBodySchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: "Invalid data" });
  }
  await User.updateOne({ _id: req.userId }, req.body);
  res.status(200).json({ message: "User Info updated successfully" });
});

/** Route to get users from the backend, filterable via firstName/lastName
This is needed so users can search for their friends and send them money */

router.get("/bulk", async (req, res) => {
  try {
    const { filter = "" } = req.query;

    const users = await User.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } }, // i : case-insensitive
        { lastName: { $regex: filter, $options: "i" } },
      ],
    });

    res.json({
      users: users.map(({ username, firstName, lastName, _id }) => ({
        username,
        firstName,
        lastName,
        _id,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
});

module.exports = router;
