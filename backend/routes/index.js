const express=require("express");
const userRouter = require("./user");
const Accountrouter=require("./account");

const router =express.Router();

router.use("/user",userRouter);
router.use("/accounts",Accountrouter);

module.exports = router;