const express = require("express");
const userRouter = require("./usercreate");
const signin = require("./signin")
const updateinfo = require("./updateinfo")
const Userquery = require("./Userquery")
const account  = require("./account")
const router = express.Router();

router.use("/signup", userRouter);
router.use("/signin",signin)
router.use("/update",updateinfo)
router.use("/alluser",Userquery)
router.use("/account",account)


module.exports = router;