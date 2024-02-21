import { Account, User } from "../Database/db.js";
import {
  signinZodSchema,
  userZodSchema,
} from "../InputValidation/inputValidation.js";
import Jwt from "jsonwebtoken";
import { JWT_secret } from "../config.js";

export const checkUserExist = async (req, res, next) => {
  const username = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;

  const newUser = {
    username,
    password,
    firstname,
    lastname,
  };

  const validation = userZodSchema.safeParse(newUser);
  if (!validation.success) {
    return res.status(403).json({ msg: "Inputs are incorrect" });
  } else {
    const founded = await User.findOne({ username });
    // console.log("founded",founded)
    if (founded) {
      return res.status(401).json({ msg: "user already exist" });
    } else {
      next();
    }
  }
};

export const signInValidation = async (req, res, next) => {
  const username = req.body.email;
  const password = req.body.password;

  const signinUser = {
    username,
    password,
  };
  // console.log("signinUser",signinUser)
  const { success } = signinZodSchema.safeParse(signinUser);
  console.log("success", success);
  if (!success) {
    return res.status(411).json({ msg: "Inputs are incorrect" });
  } else {
    const ifExist = await User.findOne({ username });
    console.log(ifExist);
    if (ifExist) {
      req.userId = ifExist._id;
      console.log(req.userId);
      next();
    } else {
      return res.status(404).json({ msg: "User not found / incorrect inputs" });
    }
  }
};

// authMiddlewear

export const authMiddlewear = (req, res, next) => {
  const tokenString = req.headers.authorization; //
  console.log(tokenString);
  if (!tokenString || !tokenString.startsWith("Bearer")) {
    return res.status(403).json({ msg: "wrong user" });
  }
  const tokenArray = tokenString.split(" ");
  const token = tokenArray[1];
  try {
    const decodedValue = Jwt.verify(token, JWT_secret);
    req.userId = decodedValue.id;
    next();
    return;
  } catch (error) {
    return res.status(403).json({ msg: "some error occured", error });
  }
};

// export const receiverExist = async (req, res, next) => {
//   const userId = req.body.to;
//   console.log(userId);
//   if (!userId) {
//     res.status(404).json({ msg: "Invalid Account Please fill id" });
//   } else {
//     const searchedAccount = await Account.findOne({ userId });
//     console.log("searched account from receiver ", searchedAccount);
//     if (searchedAccount) {
//       next();
//     } else {
//       res.status(404).send("Reciever Not Exist");
//     }
//   }
// };

// export const balanceCheck = async (req, res, next) => {
//   const amount = req.body.amount;

//   if (!amount) {
//     res.status(400).json({ msg: "Please Enter Amount" });
//   } else if (amount <= 0) {
//     res
//       .status(411)
//       .json({ msg: "To transfer Amount Should be greater than 0" });
//   }

//   const userId = req.userId;
//   // console.log(userId);

//   const checkedSenderBalance = await Account.findOne({ userId });
//   console.log("checking sender balance", checkedSenderBalance);

//   const accountBalance = checkedSenderBalance.balance;

//   if (accountBalance >= amount) {
//     next();
//   } else {
//     res.status(404).json({ msg: "Insufficent Amount" });
//   }
// };
