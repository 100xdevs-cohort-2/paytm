const { Router } = require("express");
const router = Router();

const userRouter = require("./user");
const accountRouter = require("./accounts");

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;
