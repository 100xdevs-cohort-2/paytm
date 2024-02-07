const express = require("express");
const userrouter = require("./user");
const account = require("./account");

const router = express.Router();

router.use("/user", () => userrouter);
router.use("/account", () => account);
module.exports = router;
