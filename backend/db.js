// backend/db.js
const mongoose = require('mongoose');

mongoose.connect("your Url");

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
       
    },
    password: {
        type: String,
        required: true,
        
    },
    firstName: {
        type: String,
        required: true,
       
    },
    lastName: {
        type: String,
        required: true,
       
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
	User,
    Account
};
