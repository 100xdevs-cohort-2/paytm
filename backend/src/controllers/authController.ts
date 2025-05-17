import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../Ienv";
const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, firstName, lastName } = req.body;
    const salt=10;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({
        message: "Username is already taken"
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password,salt);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName
    });

    res.status(201).json({
      user: newUser,
      message: "User created successfully"
    });
    return;
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      res.status(400).json({
        message: "User not found"
      });
      return;
    }
    const passwordCompare = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCompare) {
      res.status(400).json({
        message: "Incorrect Password"
      });
      return;
    }
    const JWT_Password = env.JWT_Password as string;
    const token = jwt.sign({ userID: existingUser._id }, JWT_Password);
    const data = {
      username: existingUser.username,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName
    };
    res.status(200).json({
      message: "Login Successfully",
      data,
      token
    });
    return;
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({
        message: e.message
      });
    } else {
      res.status(500).json({ message: "Unexpected error has occured" });
    }
  }
};

const authController = {
  register,
  login
};

export default authController;
