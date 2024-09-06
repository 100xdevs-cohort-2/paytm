const express = require("express");
const { authMiddleware } = require("../middleware");
const router = express.Router();
const { Account } = require("../db");

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.json({
      balance: account.balance,
    });
  } catch (error) {
    console.error("Error retrieving account balance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await Account.startSession();

  session.startTransaction();

  const { to, amount } = req.body;
  const fromAccount = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!fromAccount || fromAccount.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      msg: "Insufficient Balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      msg: "Invalid Account",
    });
  }

  // if every thing is fine then perform the transfer of amount

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();

  res.status(200).json({
    msg: "Transfer Successful",
  });
});

module.exports = router;
