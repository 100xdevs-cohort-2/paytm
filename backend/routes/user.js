const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const JWT_SECRET = require("../config");
const app = express();

const router = express.Router();

const zodSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success, error } = zodSchema.safeParse(body);

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

module.exports = router;
