const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const accountRouter = require("./account");

router.use("/user", userRouter);
router.use("/account", accountRouter);

router.get("/", (req, res) => {
    return res.status(200).json({
        message: "in index.js (root router)"
    })
})

module.exports = router;