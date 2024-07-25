const express = require("express");
const userRouter = require('./user');
const accountRouter = require('./account');
const router = express.router();

router.use('/users',userRouter);
router.use('/account',accountRouter);

module.exports = router;