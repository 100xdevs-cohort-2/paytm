const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

main().catch((err) => console.log(err));

async function main() {
	await mongoose.connect(
		"mongodb+srv://dtsri:70cSkQUTAlOxt7um@backendserver.dtx9lbp.mongodb.net/users"
	);
}

//creating a schema
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		minLength: 3,
		maxLength: 30,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
	firstName: {
		type: String,
		required: true,
		trim: true,
		maxLength: 25,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
		maxLength: 25,
	},
});

// Method to generate a hash from plain text
UserSchema.methods.createHash = async function (plainTextPassword) {
	// Hashing user's salt and password with 10 iterations,
	const saltRounds = 10;

	// First method to generate a salt and then create hash
	const salt = await bcrypt.genSalt(saltRounds);

	//generates the hashPassword
	return await bcrypt.hash(plainTextPassword, salt);
};

//For validation, get the password from DB (this.password --> hashPassword) and compare it to the input Password provided by the client
//note: we dont implement this method
UserSchema.methods.validatePassword = async function (candidatePassword) {
	//returns a boolean indicating if passwords matches or not
	return await bcrypt.compare(candidatePassword, this.password);
};

//creating a User Model aka creating a class
const User = mongoose.model("USER", UserSchema);

const AccountSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User", //this refferring to the document of the User Model
		//for value we have to just metnion ref:user._id
		required: true,
	},
	balance: {
		type: Number,
		required: true,
	},
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = {
	User,
	Account,
};
