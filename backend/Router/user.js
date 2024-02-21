import express from "express";
import { Router } from "express";
import {
  signinZodSchema,
  updateZodSchema,
  userZodSchema,
} from "../InputValidation/inputValidation.js";
import {
  authMiddlewear,
  checkUserExist,
  signInValidation,
} from "../MIddlewear/userMiddlewear.js";
import { Account, User } from "../Database/db.js";
import Jwt from "jsonwebtoken";
import { JWT_secret } from "../config.js";
const userRouter = Router();

// userRouter.get("/", (req, res) => {
//   res.send("working with user");
// });

userRouter.post("/signup", checkUserExist, async (req, res) => {
  const firstname = req.body.firstName;
  const password = req.body.password;
  const username = req.body.email;
  const lastname = req.body.lastName;

  const newUser = {
    username,
    password,
    firstname,
    lastname,
  };
  const created = await User.create(newUser);
  // console.log(created);
  const id = created._id;

  const balance = await Account.create({
    userId: id,
    balance: Math.floor(1 + Math.random() * 10000),
  });
  console.log(balance);
  const token = Jwt.sign({ id }, JWT_secret);
  // console.log(token)
  return res
    .status(200)
    .json({ msg: "User Created Successfully", userId: id, token });
});

userRouter.post("/signin", signInValidation, (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const id = req.userId;
  const jwtToken = Jwt.sign({ id }, JWT_secret);
  return res
    .status(200)
    .json({ msg: "signed in successfully", token: jwtToken, id });
});

userRouter.put("/update", authMiddlewear, async (req, res) => {
  const detailsToUpdate = req.body;
  const success = updateZodSchema.safeParse(detailsToUpdate);
  if (!success) {
    return res.status(411).json({ msg: "invalid input" });
  } else {
    const id = req.userId;
    const result = await User.findByIdAndUpdate(id, detailsToUpdate, {
      new: true,
    });
    // console.log("result is ",result)
    res.status(200).json({ msg: "updated Sucessfully", result });
  }
});

userRouter.get("/", authMiddlewear, async (req, res) => {
  // const searchBy = req.params.id;
  const _id = req.userId;
  // console.log("searching by ", _id);
  const result = await User.findOne( {_id} );
  console.log(result);
  if (result) {
    res.status(200).json({ msg: "user found", result });
  } else {
    res.send("failed");
  }
});

userRouter.get("/all", authMiddlewear, async (req, res) => {
  const searchBy = req.query.filter || "";
  const _id = req.userId
  //   console.log(searchBy);
  const result = await User.find({
    _id:{$ne:_id},
    $or: [
      {
        firstname: {
          $regex: searchBy,
        },
      },
      {
        lastname: {
          $regex: searchBy,
        },
      },
    ],
  });

  res.status(200).json({
    users: result.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      id: user._id,
    })),
  });
});

export { userRouter };
