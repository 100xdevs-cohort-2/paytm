const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/paytm');


const UserSchema=new mongoose.Schema({
    
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
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }

}) 
const accountSchema=new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    balance:{
        type:Number,
        required:true,
    }
})
const User=mongoose.model('User',UserSchema)
const  Account=mongoose.model('Account',accountSchema)

module.exports={
    User,Account
};

