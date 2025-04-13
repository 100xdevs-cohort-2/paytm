const express  = require("express")
const authvalidator = require("../middlewere")
const { Balance } = require("../db")
const { default: mongoose } = require("mongoose")
const router = express.Router()


router.get("/balance",authvalidator, async (req,res)=>{
     const info = await Balance.findOne({ userId: req.userId });
    res.json({
    balance:info.balance
    })
}) 
router.post("/transfer", authvalidator, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const { amount, to } = req.body;
  
      const fromAccount = await Balance.findOne({ userId: req.userId }).session(session);
      const toAccount = await Balance.findOne({ userId: to }).session(session);
  
      if (!fromAccount || fromAccount.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Insufficient balance or sender account not found." });
      }
  
      if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Receiver account not found." });
      }
  
      await Balance.updateOne(
        { userId: req.userId },
        { $inc: { balance: -amount } }
      ).session(session);
  
      await Balance.updateOne(
        { userId: to },
        { $inc: { balance: amount } }
      ).session(session);
  
      await session.commitTransaction();
      res.json({ message: "Transaction completed successfully." });
    } catch (error) {
      await session.abortTransaction();
      console.error("Transaction failed:", error);
      res.status(500).json({ message: "Transaction failed due to an internal error." });
    } finally {
      session.endSession();
    }
  });
  

module.exports = router