const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const zod = require("zod");
const JWT_SECRET = require("../config");

const { User } = require("../db");
const { Account } = require("../db");

const { authMiddleware } = require("../middleware");

const signupBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.send({
      msg: "Incorrect Credentials",
    });
  }

  const userExist = await User.findOne({
    username: req.body.username,
  });

  if (userExist) {
    return res.status(411).json({
      msg: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;

  Account.create({
    userId,
    balance: 1 + Math.random() * 1000,
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.status(200).json({
    msg: "User created successfully",
    token: token,
  });
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      msg: "Incorrect inputs",
    });
  }

  const userExist = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (userExist) {
    const token = jwt.sign(
      {
        userId: userExist._id,
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });

    return;
  }

  res.status(411).json({
    msg: "User not found / Please signup",
  });
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/change", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      msg: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    msg: "Update Successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const fliter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: fliter,
        },
      },
      {
        lastName: {
          $regex: fliter,
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

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    credential: true,
  });
});
module.exports = router;
