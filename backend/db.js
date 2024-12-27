const mongoose = require("mongoose");

// connect to mongoDB
mongoose.connect('mongodb+srv://ayushraj1605:Ayush1raj@cluster0.qbt0p.mongodb.net/paytm');

const UserSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        lowercase:true,
        minLength: 5,
        maxLength: 30,
    },
    password:{
        type: String,
        required: true,
        trim:true,
        minLength: 8,
        maxLength: 30,
    },
    firstName:{
        type: String,
        required: true,
        trim:true,
        maxLength:50
    },
    lastName:{
        type: String,
        required: true,
        trim:true,
        maxLength:50,
    },
})

const accountSchema= new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    balance:{
        type:Number,
        required:true,
    }
})

const User= mongoose.model('User',UserSchema);
const Account= mongoose.model('User',accountSchema);

module.exports={
    User,
    Account,
}