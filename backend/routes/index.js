const express = require("express");
const userRouter = require("./user");
// Creating express Router
const router = express.Router();

router.use("/user", userRouter);

module.exports = router;
