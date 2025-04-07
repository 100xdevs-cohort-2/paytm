const express=require("express");
const { accountRouter } = require("./account");
const { userRouter } = require("./user");
const Router=express.Router;

const router=Router();

router.get("/test",(req,res)=>{
    res.send({
        message:"Test Successed"
    });
})

router.use("/user",userRouter)
router.use("/account",accountRouter);

module.exports={
    router
}