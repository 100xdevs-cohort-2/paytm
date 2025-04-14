const mongoose = require("mongoose");
require('dotenv').config()
const dburl  = process.env.dburl

mongoose.connect(
dburl
);

const userschema = new mongoose.Schema({
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
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastname: { type: String, required: true, trim: true, maxLength: 50 },
});

const accschema = new mongoose.Schema({
  userId:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:true
  },
  balance:{
    type:Number,
    required:true
  }
})

const User = mongoose.model("User", userschema);
const Balance = mongoose.model("Balance",accschema)
module.exports = {
  User,
  Balance
};
