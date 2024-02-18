const express = require("express");
const userRouter = require('./user');
const { User } = require("../db/db");
const zod = require("zod");

const router = express.Router();

router.use("/user", userRouter)


module.exports = router;