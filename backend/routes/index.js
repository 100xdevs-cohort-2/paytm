const express = require('express');
const userRouter = requrie("./user.js");
const accountRouter = require("./accounts");

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;;