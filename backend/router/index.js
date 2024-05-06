const express = require('express');
const userRouter=require("../router/user");
const accountRouter=require("../router/account")

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;

