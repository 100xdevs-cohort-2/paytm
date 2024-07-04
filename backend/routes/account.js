const express = require("express");
const { authMiddleware } = require("../middileware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/balance",authMiddleware, async (req,res)=>{
    const account = await Account.findOne({
        userId: req.userId
    })
    if(account){
        res.status(200).json({
            balance: account.balance
        })
    }
})

router.post("/transfer",authMiddleware,async (req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;
    // fetch the account details initiating trtansaction
    const account = await Account.findOne({userId: req.userId}).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Insufficient balance"
        })
    }
    // fetch the account details of the user receivnig money

    const toAccount = await Account.findOne({userId: to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account"
        })
    }

    // perform the transfer
    await Account.updateOne({userId: req.userId},{$inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId: to},{$inc: {balance: amount}}).session(session);
    
    // now commit the transaction
     await session.commitTransaction();
     res.json({
        msg: "transfer Successfull"
     })

})

module.exports = router;