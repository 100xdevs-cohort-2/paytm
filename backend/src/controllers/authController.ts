import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
  try {
    const { username, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({
        message: "Username is already taken"
      });
    
    }

    const hashedPassword = await bcrypt.hash(password, 10);
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
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

const authController = {
  register
};

export default authController;
