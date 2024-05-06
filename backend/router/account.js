
const express=require("express");
const router=express.Router();
const {Account}=require("../db/index");
const { authMiddleware } = require("../middleware/Authmiddleware");
const { default: mongoose } = require("mongoose");



router.get("/balance", authMiddleware, async (req, res) => {
    
    const account = await Account.findOne({
        userId: req.userId
    });
    const balance=account.balance
    const formattedBalance = balance.toFixed(2);
try {
    res.json({
        balance: formattedBalance
    })
} catch (error) {
   res.json({
    error:error
   }) 
}
   
});
router.post("/transfer",authMiddleware,async(req,res)=>{
    const session=await mongoose.startSession();
    session.startTransaction();
   const {amount,to}=req.body;
   const account=await Account.findOne({
    userId: req.userId
}).session(session)
if(account.balance<amount){
    return res.status(400).json({
        msg:"insufficient balance"
    })
}
const toAccount = await Account.findOne({
    userId: to
}).session(session)

if (!toAccount) {
    return res.status(400).json({
        message: "Invalid account"
    })
}

await Account.updateOne({
    userId: req.userId
}, {
    $inc: {
        balance: -amount
    }
}).session(session)

await Account.updateOne({
    userId: to
}, {
    $inc: {
        balance: amount
    }
}).session(session)
await session.commitTransaction()
res.json({
    message: "Transfer successful"
})
})
module.exports=router;