const express=require("express");
const { authMiddleware } = require("../middleware/auth-middleware");
const { AccountModel } = require("../db");
const Router=express.Router;
const mongoose=require("mongoose");


const accountRouter=Router()

accountRouter.get("/balance",authMiddleware,async(req,res)=>{
    
    const userId=req.userId;
    console.log(userId);

    // Fetch Balance From the UserId
    try{
        const record=await AccountModel.findOne({
            userId:userId
        });
        console.log(record);
        res.status(200).send({
            balance:record.balance
        });
        return;
    }
    catch(e){
        res.send({
            error:"Error in Making an DB Request",
            e:e
        })
    }
})

accountRouter.post("/transfer",authMiddleware,async(req,res)=>{

    const{to,amount}=req.body;
    // check For Balance 
    try{
        const userAccount=await AccountModel.findOne({
            userId:req.userId
        });

        if(userAccount.balance<amount){
            res.send({
                message: "Insufficient balance"
            });
            return;
        }
    }
    catch{
        res.send({
            error:"Some Error in Making the DB Request"
        });
        return;
    }

    //  Check weather the recipent "to" account via a userId is a valid Account or Not

    try{
        const toAccount=await AccountModel.findOne({
            userId:to
        });
        if(!toAccount){
            res.send({
                message: "Invalid account"
            });
            return;
        }
    }
    catch{
        res.send({
            error:"Some Error in Making the DB Request"
        });
        return;
    }

    // Transctions
    const session = await mongoose.startSession();

    try{
        session.startTransaction();

        // Deduct the Amount From the Sender

        await AccountModel.updateOne({
            userId:req.userId
        },{ $inc: { balance: -amount } }).session(session);

        await AccountModel.updateOne({
            userId:to
        },{
            $inc:{balance:amount}
        }).session(session);

        await session.commitTransaction();
        res.status(202).send({
            message: "Transfer successful"
        });
    }catch{
        res.send({
            error:"Some Error in Making the DB Request"
        });
        return;
    }

})

module.exports={
    accountRouter:accountRouter
}