const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://prince981620:Hello%4012345@cluster0.twgxb.mongodb.net/paytm");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // trim spaces from begininig and ends
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 50
    }
})
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})
const Account = mongoose.model("account",accountSchema);
const User = mongoose.model("User",userSchema);

module.exports = {
    User,
    Account
}