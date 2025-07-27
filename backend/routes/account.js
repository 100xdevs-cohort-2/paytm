import express from "express";
import { authMiddleware } from "../middleware.js";
import { Account } from "../db.js";
import mongoose from "mongoose";

export const accountRouter = express.Router();

accountRouter.get('/balance', authMiddleware, async (req, res) => {
    // console.log("token: ",req.userId)
    try {
        const userAccount = await Account.findOne({
            userId: req.userId
        });
        // console.log(userAccount);
        if (!userAccount) {
            res.status(404).json({
                message: 'Client side error'
            })
        }
        res.status(200).json({
            balance: userAccount.balance
        });
    } catch (error) {
        // res.status(500).json({
        //     message: 'Internal Server Error'
        // })
        console.log(error);
    }
});

accountRouter.post('/transfer', authMiddleware, async (req, res) => {
    
    const session=await mongoose.startSession();
    
    session.startTransaction();
    try {
        const {to, amount}=req.body;
        if(amount<0){
            await session.abortTransaction();
            return res.status(400).json({
                message: "Negative amount is not allowed"
            })
        }
        const fromAccount=await Account.findOne({userId: req.userId}).session(session);

        if(!fromAccount || amount > fromAccount.balance){
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            })
        }
        
        await Account.updateOne(
            {userId: req.userId},
            {
                $inc: {
                    balance: -amount
                }
            },
        ).session(session);

        const toAccount=await Account.findOne({userId: to}).session(session);
        if(!toAccount){
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            })
        }


        await Account.updateOne(
            {userId: to},
            {
                $inc: {
                    balance: amount
                }
            }
        ).session(session);

        await session.commitTransaction();
        res.status(200).json(
            {
                message: "Transfer successful"
            }
        )
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({
            message: 'Internal server error so rollback'
        })
    }
    finally{
        await session.endSession();
    }
})