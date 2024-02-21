import { Router } from "express";
import { authMiddlewear } from "../MIddlewear/userMiddlewear.js";
import { JWT_secret } from "../config.js";
import Jwt from "jsonwebtoken";
import { Account } from "../Database/db.js";
import mongoose from "mongoose";

const accountRouter = Router();
accountRouter.get("/", (req, res) => {
  res.send("working fine");
});

accountRouter.get("/balance", authMiddlewear, async (req, res) => {
  const userId = req.userId;

  try {
    const searchedAccount = await Account.findOne({ userId });
    //   console.log("searched account", searchedAccount);
    // if (!searchedAccount) {
    //   res.status(404).json({ msg: "Account not found" });
    // }
    res.status(200).json({
      msg: "Balance sucessfully fetched",
      balance: searchedAccount.balance,
    });
  } catch (error) {
    res.status(400).json({ msg: "some error ocuured" });
  }
});

accountRouter.post("/transfer", authMiddlewear, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { to, amount } = req.body;

  if (!amount || amount < 0) {
    await session.abortTransaction();
    return res.status(402).json({ msg: "please enter correct amount" });
  }

  const balanceCheck = await Account.findOne({ userId: req.userId }).session(
    session
  );
  if (balanceCheck.balance < amount) {
    await session.abortTransaction();
    return res.status(401).json({ msg: "Insufficent Funds" });
  }

  const searchedReciever = await Account.findOne({ userId: to }).session(
    session
  );
  if (!searchedReciever) {
    await session.abortTransaction();
    return res.status(404).json({ msg: "Invalid Account" });
  }

  // performing transactions

  const sendingAmount = await Account.findOneAndUpdate({ userId: req.userId },{ $inc: { balance: -amount } },{ new: true }).session(session);
  const receivingAmount = await Account.findOneAndUpdate({ userId: to },{ $inc: { balance: amount } },{ new: true }).session(session);

  console.log("after sending", sendingAmount);
  console.log("after recieving", receivingAmount);

  await session.commitTransaction();
  res.status(200).json({ msg: "Transfer Successfully" });
});
export { accountRouter };
