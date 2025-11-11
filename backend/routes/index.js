const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");

const router = express.Router();

// send all requests with /user to userRouter
router.use("/user", userRouter);

// send all requests with /account to accountRouter
router.use("/account", accountRouter);

module.exports = router;
