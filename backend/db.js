const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ranamohit2051:user123@100xdevs.q5dmy0i.mongodb.net/");

const db = mongoose.connection;

//creating schema for the users

const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String
});

const User = mongoose.model('User', userSchema);

module.exports = {User};

