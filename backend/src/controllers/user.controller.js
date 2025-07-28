import mongoose from "mongoose";
import * as z from "zod";
import { User } from "../models/user.model.js";
import { Account } from "../models/account.model.js";

const signupObj = z.object({
  firstName: z.string().min(3).max(15),
  lastName: z.string().min(3).max(15),
  username: z.string().min(3).max(15),
  password: z.string().min(6).max(20),
});

const loginObj = z.object({
  username: z.string().min(3).max(15),
  password: z.string().min(6).max(20),
});

export async function userLogin(req, res) {
  try {
    const parsed = loginObj.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({
        status: "fail",
        message: "Invalid user data",
      });
    const { username, password } = parsed.data;
    const userExist = await User.findOne({ username });
    if (!userExist)
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });

    const isPasswordValid = await userExist.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid password",
      });
    }

    const userObj = userExist.toObject();
    delete userObj.password;
    delete userObj.__v;

    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: {
        user: userObj,
        token: req.token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Login Request Failed, Try Again",
    });
  }
}

export async function userSignup(req, res) {
  try {
    const { success } = signupObj.safeParse(req.body);
    if (!success)
      return res.status(400).json({
        status: "fail",
        message: "Invalid user data",
      });
    const { username, password, firstName, lastName } = req.body;
    const userExist = await User.findOne({ username });
    if (userExist)
      return res.status(404).json({
        status: "fail",
        message: "User Already exists",
      });
    const token = req.token;
    if (!token)
      return res.status(401).json({
        status: "fail",
        message: "Token is required",
      });
    const userData = await User.create({
      firstName,
      lastName,
      username,
      password,
    });

    const accountBalance = await Account.create({
      userId: userData._id,
      balance: Math.floor(Math.random() * 1000) + 1,
    });

    if (!userData && !accountBalance)
      return res.status(401).json({
        status: "error",
        message: "Failed to create user",
      });

    const userObj = userData.toObject();
    delete userObj.password;
    delete userObj.__v;
    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: {
        user: userObj,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Signup Request Failed, Try Again",
    });
  }
}

export async function userLoginCheck(req, res) {
  try {
    if (req.user) {
      console.log(req.user.username);
      const userDetails = await User.findOne({ username: req.user.username });
      if (!userDetails) {
        return res.status(404).json({
          status: "fail",
          message: "User not found",
        });
      }
      const userObj = userDetails.toObject();
      delete userObj.password;
      delete userObj.__v;
      return res.status(200).json({
        status: "success",
        message: "Token is still accessible and hasnt expired yet",
        data: {
          user: userObj,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to check user login status",
    });
  }
}


export async function getAllUsers(req, res) {
  try {
    const currentUsername = req.user.username;

    const allUsers = await User.find({ username: { $ne: currentUsername } }).select(
      "-password -__v -firstName -lastName"
    );

    if (!allUsers || allUsers.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "No Users Found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        users: allUsers,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to retrieve users",
    });
  }
}
