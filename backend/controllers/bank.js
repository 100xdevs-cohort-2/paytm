const mongoose = require("mongoose")
const Account = require("../models/bank");

async function handleGetBalance(req, res) {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
}

async function handleTransfer(req, res) {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { amount, to } = req.body;

        // Fetch the accounts within the transaction
        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        // Perform the transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        // Commit the transaction
        await session.commitTransaction();

    } catch (error) {
        await session.abortTransaction();
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
    res.json({
        message: "Transfer successful"
    });
};

module.exports = {
    handleGetBalance,
    handleTransfer
}