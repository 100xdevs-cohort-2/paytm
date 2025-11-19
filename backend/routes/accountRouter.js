const express = require("express");
const Account = require("../Models/accoutModal.js");
const User = require("../Models/userModel.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const router = express.Router();

// GET /api/v1/account/balance - Get user's account balance
router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Find or create account for the user
    let account = await Account.findOne({ userId });

    if (!account) {
      // Create account with initial balance of 0
      account = new Account({
        userId,
        balance: 0,
      });
      await account.save();
    }

    res.status(200).json({
      balance: account.balance,
      message: "Balance fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({
      error: "Failed to fetch balance",
      details: error.message,
    });
  }
});

// POST /api/v1/account/transfer - Transfer money to another user
router.post("/transfer", authMiddleware, async (req, res) => {
  try {
    const { to, amount } = req.body;
    const fromUserId = req.user.id;

    // Validation
    if (!to || !amount) {
      return res.status(400).json({
        error: "Recipient ID and amount are required",
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        error: "Amount must be greater than 0",
      });
    }

    if (to === fromUserId) {
      return res.status(400).json({
        error: "Cannot transfer money to yourself",
      });
    }

    // Check if recipient exists
    const recipient = await User.findById(to);
    if (!recipient) {
      return res.status(404).json({
        error: "Recipient not found",
      });
    }

    // Start transaction
    const session = await Account.startSession();
    session.startTransaction();

    try {
      // Find or create sender's account
      let senderAccount = await Account.findOne({ userId: fromUserId }).session(
        session
      );
      if (!senderAccount) {
        senderAccount = new Account({
          userId: fromUserId,
          balance: 0,
        });
        await senderAccount.save({ session });
      }

      // Find or create recipient's account
      let recipientAccount = await Account.findOne({ userId: to }).session(
        session
      );
      if (!recipientAccount) {
        recipientAccount = new Account({
          userId: to,
          balance: 0,
        });
        await recipientAccount.save({ session });
      }

      // Check if sender has sufficient balance
      if (senderAccount.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
          error: "Insufficient balance",
        });
      }

      // Update balances
      senderAccount.balance -= amount;
      recipientAccount.balance += amount;

      await senderAccount.save({ session });
      await recipientAccount.save({ session });

      await session.commitTransaction();

      res.status(200).json({
        message: "Transfer successful",
        balance: senderAccount.balance,
      });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error("Transfer error:", error);
    res.status(500).json({
      error: "Transfer failed",
      details: error.message,
    });
  }
});

// POST /api/v1/account/add - Add amount to account (Deposit)
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!amount) {
      return res.status(400).json({
        error: "Amount is required",
      });
    }

    // Validate amount (must be > 0)
    if (amount <= 0) {
      return res.status(400).json({
        error: "Amount must be greater than 0",
      });
    }

    // Validate maximum amount (optional safety check)
    if (amount > 1000000) {
      return res.status(400).json({
        error: "Maximum deposit amount is ₹10,00,000",
      });
    }

    // Find or create account and update balance
    const account = await Account.findOneAndUpdate(
      { userId },
      { $inc: { balance: amount } },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: "Amount deposited successfully",
      balance: account.balance,
      depositedAmount: amount,
    });
  } catch (error) {
    console.error("Deposit error:", error);
    return res.status(500).json({
      error: "Failed to deposit amount",
      details: error.message,
    });
  }
});

module.exports = router;
