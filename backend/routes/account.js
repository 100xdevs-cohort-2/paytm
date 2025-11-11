const express = require("express");
const { authMiddleware } = require("../middlewares");
const { Account } = require("../db");
const mongoose = require("mongoose");
const router = express.Router();

// route to get the balance of the user
router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const acc = await Account.findOne({ userId: req.userId });
    if (!acc) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ balance: acc.balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// route to send money from one person to another person
// very important to do this as transactions

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      session.endSession(); // End the session
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      session.endSession(); // End the session
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    // if sender and receiver are the same
    if (account.userId.toString() === toAccount.userId.toString()) {
      await session.abortTransaction();
      session.endSession(); // End the session
      return res.status(400).json({ message: "Cannot send money to yourself" });
    }

    // Perform the transaction
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } },
      { session }
    );
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } },
      { session }
    );

    await session.commitTransaction();
    session.endSession(); 

    res.json({ message: "Transaction successful" });
  } catch (error) {
    console.error(error);
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession(); 
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
