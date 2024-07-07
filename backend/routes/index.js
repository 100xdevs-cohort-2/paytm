const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account"); 
const router = express.Router();
// all the req for /api/v1 comes to this router i.e /routes/index.js

// and from here all the req goes to /api/v1/user goes to
router.use("/user",userRouter);
// and from here all the req goes to /api/v1/account goes to
router.use("/account",accountRouter);

module.exports = router;
