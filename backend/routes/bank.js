const express = require("express");
const { authMiddleware } = require("../middleware");
const { handleGetBalance, handleTransfer } = require("../controllers/bank");

const bankRoute = express.Router();

bankRoute.get("/balance", authMiddleware, handleGetBalance)
bankRoute.post("/transfer", authMiddleware, handleTransfer)

module.exports = bankRoute;