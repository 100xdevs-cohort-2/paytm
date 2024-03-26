const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ayushshivhare1003:ZdF8qehyE1mBQOO8@cluster0.qve4rac.mongodb.net/PaytmTryAgain"
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true, 
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
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

const accountsTable = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountsTable);
const User = mongoose.model("User", userSchema);

module.exports = {
  Account,
  User,
};
