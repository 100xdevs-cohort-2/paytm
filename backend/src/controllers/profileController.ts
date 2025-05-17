import { Response } from "express";
import IRequest from "../middlewares/IRequest";
import User from "../models/User";
import bcrypt from "bcrypt";
import env from "../Ienv";

const updateProfile = async (req: IRequest, res: Response): Promise<void> => {
  try {
    const { password, firstName, lastName } = req.body;
    const userId = req.userId;
    console.log("user Id",userId)
    const salt = 10;
    const existingUser = await User.findOne({ _id: userId });
    if (!existingUser) {
      res.status(400).json({
        message: "User not found"
      });
      return;
    }
    if (password) {
      const hashPassword = await bcrypt.hash(password, salt);
      existingUser.password = hashPassword;
    }
    if(firstName)existingUser.firstName = firstName;
    if(lastName)existingUser.lastName = lastName;
    await existingUser.save();
    const data = {
      username: existingUser.username,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName
    };
    res.status(200).json({
      message: "Updated Successfully",
      data
    });
    return;
  } catch (e) {
    if (e instanceof Error) {
      res.status(411).json({
        message: e.message
      });
      console.error(e.message);
    } else {
      res.status(500).json({
        message: "Unexpected error has occured"
      });
    }
  }
};


const ProfileController={
    updateProfile
}
export default ProfileController