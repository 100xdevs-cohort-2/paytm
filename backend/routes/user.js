const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");

const signUpZodSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
  firstName: zod.string().min(3).max(20),
  lastName: zod.string().min(3).max(20),
});

router.post("/signup", async (req, res) => {
  const signUpBody = req.body;
  const { success } = signUpZodSchema.safeParse(signUpBody);

  if (!success) {
    return res.status(411).json({
      msg: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: signUpBody.username,
  });

  if (existingUser) {
    return res.status(411).json({
      msg: "Email already taken",
    });
  }

  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = newUser._id;

  const account = await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.status(200).json({
    msg: "User created Successfully",
    token: token,
  });
});

const signInZodSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

router.post("/signin", async (req, res) => {
  const signInBody = req.body;
  const { success } = signInZodSchema.safeParse(signInBody);

  if (!success) {
    return res.status(411).json({
      msg: "Incorrect Inputs",
    });
  }

  const existingUser = User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (existingUser) {
    const token = jwt.sign(
      {
        userId: existingUser._id,
      },
      JWT_SECRET
    );

    res.json({
      msg: "User Logged In Successfully",
      token: token,
    });
    return;
  }
});

const updateProfileZodSchema = zod.object({
  password: zod.string().min(6).optional(),
  firstName: zod.string().min(3).max(20).optional(),
  lastName: zod.string().min(3).max(20).optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateProfileZodSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  const updatedBody = await User.updateOne({ _id: req.userId }, req.body);

  return res.json({
    message: "User Updated Successfully" + updatedBody,
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
