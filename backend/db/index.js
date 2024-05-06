const mongoose=require("mongoose");
const { Schema, string } = require("zod");

mongoose.connect("mongodb+srv://ajit:Uzumaki%4033@cluster0.mzs5ylr.mongodb.net/paytm")

const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})
const accountSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    balance:{
        type:Number,
        required:true
    }
})
const User=mongoose.model("user",userSchema);
const Account=mongoose.model("account",accountSchema);

module.exports={User,Account}