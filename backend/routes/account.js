const express = require("express");
const mongoose = require("mongoose");
const { Account, User } = require("../db");
const { authMiddleware } = require("../middleware");
const { z } = require("zod");

const accountRouter = express.Router();

//end point to get the info about the balance

accountRouter.get("/balance", authMiddleware, async (req, res) => {
	const account = await Account.findOne({
		userId: req.userId,
	});

	res.json({
		balance: account.balance,
	});
});

//API endpoint to transfer the money to another account

const transferSchema = z.object({
	to: z.string(),
	amount: z.number(),
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
	//starting the session
	const session = await mongoose.startSession();

	//starting the transaction
	session.startTransaction();

	const { success, data } = transferSchema.safeParse(req.body);

	if (!success) {
		res.status(411).json({
			message: "invalid account info",
		});
		await session.abortTransaction();
		return;
	}
	const { to: targetAccount, amount: transferringAmount } = data;
	//fetch the accounts within the transaction
	const fromAccount = await Account.findOne({ userId: req.userId }).session(
		session
	);

	if (!fromAccount || fromAccount.balance < transferringAmount) {
		await session.abortTransaction();
		return res.status(400).json({ message: "Insufficient balance" });
	}

	//find the account to which transfer needs to be made.

	const toAccount = await Account.findOne({ userId: targetAccount }).session(
		session
	);

	if (!toAccount) {
		await session.abortTransaction();
		return res.status(400).json({ message: "Invalid To Account" });
	}

	//making the transfer if fromAccount has enough balance and there is active toAccount

	//debiting amount from the transferor:fromAccount
	await Account.updateOne(
		{ userId: req.userId },
		{ $inc: { balance: -transferringAmount } }
	).session(session);

	//crediting the transferringAmount to the transferee

	await Account.updateOne(
		{ username: targetAccount },
		{ $inc: { balance: transferringAmount } }
	).session(session);

	//commitiing the transactions
	await session.commitTransaction();
	res.status(200).json({
		message: "Transfer successful",
	});
});

/* 
{ $inc: { balance: -amount } }: This is the update operation to be performed on the matched document(s).
$inc is a MongoDB update operator that increments the value of the specified field (balance in this case).
 However, since the amount is prefixed with a -, it effectively decrements the balance by the specified amount.

*/

module.exports = accountRouter;
