const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const JWT_SECRET = require("../config");
const { authMiddleWare } = require("./middleware");
const app = express();

const router = express.Router();

const signUpSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signInSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const updateSchema = zod.object({
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success, error } = signUpSchema.safeParse(body);

  if (!success) {
    return res.status(411).json({
      message: "Invalid input",
      error: error.errors,
    });
  }

  const existingUser = await User.findOne({
    username: body.username,
  });

  if (existingUser) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const user = await User.create({
    username: body.username,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
  });

  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signInSchema.safeParse(body);

  if (!success) {
    return res.status(411).json({
      message: "Invalid inputs",
    });
  }

  const userExist = await User.findOne({
    username: body.username,
  });
  if (userExist) {
    const userId = userExist._id;
    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );
    res.status(200).json({
      token: token,
    });
    return;
  }
  res.status(411).json({
    message: "Error while logging in",
  });
});

router.put("/", async (req, res) => {
  const body = req.body;
  const { success } = updateSchema.safeParse(body);

  if (!success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  try {
    const result = await User.updateOne({ _id: req.userId }, body);

    console.log("Update Result:", result);

    if (result.nModified > 0) {
      res.json({
        message: "Updated successfully",
      });
    } else {
      res.json({
        message:
          "No updates performed. User may not exist or data is the same.",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter;
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
