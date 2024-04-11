const express = require("express");
const { z } = require("zod");
const router = express.Router();
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../middleware");

//creating a User Schema for zod input validation

const UserSchema = z.object({
	username: z.string().email(),
	password: z
		.string()
		.min(6, { message: "minimum of 6 characters in length" })
		.max(22, { message: "maximum of 22 characters in length" }),
	firstName: z.string(),
	lastName: z.string(),
});

//to signUp
router.post("/signup", async (req, res) => {
	const { username, password, firstName, lastName } = req.body;

	//safeparse return an object {success:true, data}
	const userValidation = UserSchema.safeParse({
		username,
		password,
		firstName,
		lastName,
	});

	if (!userValidation.success) {
		res.status(411).json({
			message: `Incorrect inputs have been entered`,
		});
		//handle error
	} else {
		const findUser = await User.findOne({ username });

		//only create a new user if we cant find a existingin one in database
		if (!findUser) {
			const newUser = new User({
				username,
				password,
				firstName,
				lastName,
			});

			//methods can only be accessed on the instances of the Model
			const hashPassword = await newUser.createHash(newUser.password);
			newUser.password = hashPassword;
			await newUser.save();
			const userId = newUser._id;

			//creating an account to the user, we can also use Account.create() method
			await Account.create({
				userId,
				balance: 1 + Math.random() * 10000,
			});

			const token = jwt.sign({ userId }, JWT_SECRET);
			res.status(200).json({
				message: `${userId} is the userId of the newly added user`,
				token,
			});
		} else {
			res.status(411).json({
				message: `User:${findUser?.username} already exists`,
			});
		}
	}
});

const LoginSchema = z.object({
	username: z.string().email(),
	password: z.string(),
});

//to sign in
router.post("/signin", async (req, res) => {
	const { username, password } = req.body;

	//check if the username and password matches the record in the database
	const loginInputValidation = LoginSchema.safeParse({ username, password });

	if (!loginInputValidation.success) {
		res.status(411).json({
			message: "wrong type of inputs",
		});
	}

	//check the record from database
	const dbrecord = await User.findOne({ username });

	if (dbrecord) {
		const isPasswordMatching = await bcrypt.compare(
			password,
			dbrecord.password
		);

		if (isPasswordMatching) {
			const userId = dbrecord._id;
			const token = jwt.sign({ userId }, JWT_SECRET);
			res.status(200).json({
				token,
				message: `${userId} user with userId login is successful`,
			});
		}
	} else {
		res.status(411).json({
			messsage: `No such record has been found`,
		});
	}
});

//api for put request
const UpdateBody = z.object({
	username: z.string().optional(),
	password: z.string().optional(),
	lastName: z.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
	const { success } = UpdateBody.safeParse(req.body);

	if (!success) {
		res.status(411).json({
			message: "error while updating information",
		});
	}

	//to find the record and update it
	await User.updateOne({ _id: req.userId }, req.body);
	res.status(200).json({
		message: "updated Successfully",
	});
});

//to get the user details based on a search.

const QueryParams = z.object({
	filter: z.string(),
});

router.get("/bulk", async (req, res) => {
	if (req.query.filter) {
		//step 1 : get the query parameters object
		const params = req.query;
		const { success, data } = QueryParams.safeParse(params);

		if (!success) {
			res.status(411).json({ message: "no query passed" });
			return;
		}

		//paramas is an ojbect having filter property and a value
		const { filter } = data;
		// Example: Find users with either firstName or lastName
		const query = {
			$or: [
				{
					firstName: filter,
				},
				{
					lastName: filter,
				},
				{
					_id: filter,
				},
			],
		};

		//now we are trying to get the resulst from the database via the filter query
		const users = await User.find(query);

		res.status(200).json({
			users: users.map((user) => ({
				userName: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				_id: user._id,
			})),
		});
	} else {
		const users = await User.find({});
		res.status(200).json({
			users: users.map((user) => ({
				userName: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				_id: user._id,
			})),
		});
	}
});

module.exports = router;
