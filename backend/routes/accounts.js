const { Router } = require("express");
const router = Router();
const { JWT_SECRET } = require("../config");
const { Accounts } = require("../db");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const account = await Accounts.findOne({ userId });
  res.json({
    balance: account.balance,
  });
});

const transferBody = zod.object({
  to: zod.string(),
  amount: zod.number(),
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const { success } = transferBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Invalid account",
    });
  }
  try {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Accounts.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const toAccount = await Accounts.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      res.status(400).json({
        message: "Invalid Account",
      });
    }
    await Accounts.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Accounts.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);
    await session.commitTransaction();
    res.json({
      message: "Transfer successful",
    });
  } catch {
    session.abortTransaction();
    return res.status(400).json({
      message: "Transaction failed",
    });
  }
});

module.exports = router;
