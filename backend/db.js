const mongoose =require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;

const User=new Schema({
    firstname:{
        type:String,
        lowercase:true
    },
    lastname:{
        type:String,
        lowercase:true
    },
    username:{
        type:String,
        unique:true,
        lowercase:true
    },
    password:String
});

const Account=new Schema({
    userId:{
        type:ObjectId,
        required:true,
        ref:"UserModel"
    },
    balance:{
        type:Number,
        required:true
    }
})


const UserModel=mongoose.model("users",User);
const AccountModel=mongoose.model("account",Account)

module.exports={
    UserModel:UserModel,
    AccountModel:AccountModel
};