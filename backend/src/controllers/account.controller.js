import { Account } from "../models/account.model.js";
import { User } from "../models/user.model.js";
import { Transaction } from "../models/transaction.model.js";
import mongoose from "mongoose";

export async function getAccountBalance(req, res) {
  try {
    const username = req.user.username;
    const accountExists = await User.findOne({ username: username });
    console.log(accountExists);
    if (!accountExists)
      return res.status(404).json({
        status: "fail",
        message: "Account not found",
      });
    const account = await Account.findOne({ userId: accountExists._id });
    return res.status(200).json({
      status: "success",
      data: {
        balance: account.balance,
        totalSent: account.totalSent || 0,
        totalReceived: account.totalReceived || 0,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Unable to fetch account balance",
      error: error.message,
    });
  }
}

export async function transferFunds(req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {

    const amount = Number(req.body.amount);
    const to = req.body.to;
    const username = req.user.username;

    if (!to || !amount || isNaN(amount) || amount <= 0) {
      throw new Error(
        "Invalid transfer data: recipient and amount are required"
      );
    }

    const currentUser = await User.findOne({ username });
    if (!currentUser) throw new Error("Sender not found");

    const fromAccount = await Account.findOne({
      userId: currentUser._id,
    }).session(session);
    if (!fromAccount || fromAccount.balance < amount) {
      throw new Error("Insufficient balance");
    }

    const toUser = await User.findById(to);
    if (!toUser) throw new Error("Recipient user not found");

    const toAccount = await Account.findOne({ userId: toUser._id }).session(
      session
    );
    if (!toAccount) throw new Error("Recipient account not found");

    const senderBalanceBefore = fromAccount.balance;
    const senderBalanceAfter = senderBalanceBefore - amount;

    fromAccount.balance = senderBalanceAfter;
    fromAccount.totalSent += amount;

    toAccount.balance += amount;
    toAccount.totalReceived += amount;

    await fromAccount.save({ session });
    await toAccount.save({ session });

    await Transaction.create(
      [
        {
          user: currentUser._id,
          counterparty: toUser._id,
          amount,
          type: "sent",
          balanceBefore: senderBalanceBefore,
          balanceAfter: senderBalanceAfter,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    return res.status(200).json({
      status: "success",
      message: "Funds transferred successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({
      status: "error",
      message: error.message || "Unable to transfer funds",
    });
  } finally {
    session.endSession();
  }
}

export async function transactionHistory(req, res) {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    const transactions = await Transaction.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate("counterparty", "username");

    return res.status(200).json({
      status: "success",
      data: { transactions },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Unable to fetch transactions",
      error: error.message,
    });
  }
}
