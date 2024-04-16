const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config();

mongoose.connect(process.env.MONGO_URL)

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
})
const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    balance: Number
})


const User = mongoose.model("User", userSchema)
const Account = mongoose.model("Account",AccountSchema);

module.exports = {
    User,
    Account
}