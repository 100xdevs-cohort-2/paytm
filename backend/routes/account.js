const express = require("express");
const { Account, User } = require("../db");
const authMiddleware = require("../middleware");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({userId: req.userId});

        res.status(200).json({
            balance: account.balance
        });
    } catch(err) {
        res.status(400).json({
            message: "Some error is preventing retrieval of balance"
        });
    }
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await Account.startSession();
    await session.startTransaction();

    try {
        const {amount, to} = req.body;
        const account = await Account.findOne({userId: req.userId}).session(session);
        const toAccount = await Account.findOne({userId: to}).session(session);
        if(!toAccount) {
            console.log("in try blok: /session.abortTransaction()/[commented]/ due to invalid account");
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            })
        }

        const currentBalance = account.balance;
        if(account && currentBalance >= amount){

            await Account.updateOne({userId: account.userId}, {$inc: {balance: -amount}}).session(session);
            await Account.updateOne({userId: toAccount.userId}, {$inc: {balance: amount}}).session(session);
            console.log("in try blok: session.commitTransaction() above transaction successful");
            await session.commitTransaction();
            res.status(200).json({
                message: "Transfer successful"
            });
        } else {
            console.log("in try blok: session.abortTransaction() due to insufficient balance");
            await session.abortTransaction();
            res.status(400).json({
                message: "Insufficient balance"
            })
        }
    } catch(err) {
        console.log("in catch blok: session.abortTransaction() - err -> ", err);
        await session.abortTransaction();
        res.status(400).json({
            message: "Could not tranfer amount. Transaction unsuccessfull"
        })
    } finally {
        console.log("in finally blok: session.endSession()");
        await session.endSession();
        return;
    }
    
})

module.exports = router;