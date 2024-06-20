const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:baivab2002@cluster0.ezuvzvl.mongodb.net/paytm")
.then(() => { console.log('Database connection successful'); }).catch((err) => {
console.error('Database connection error:', err);
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true,
        maxLength: 30,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
        maxLength: 30,
    }
});

const accountSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        retuired: true
    },

    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model("users",UserSchema);
const Account = mongoose.model("accounts", accountSchema);

module.exports = {
    User,
    Account
};