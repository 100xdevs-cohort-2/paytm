const { Router } = require('express');
const router = Router();
const userRouter = require('./userRoutes');


router.use("/user", userRouter);

router.get("/", (req, res) => {
    res.end("It is the end!")
})

module.exports = { router };