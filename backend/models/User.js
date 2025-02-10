const  {Schema ,type , model} = require("mongoose");
const mongoose= require("mongoose");

mongoose.connect("mongodb://localhost:27017/BankUser").then(()=>{console.log("the db has started ")})
const userSchema = new  Schema({
    Fullname:{
        type:String,
        required:true,

    },
    Email:{
        type:String,
        required:true,
        unique:true,

    },
    Password:{
        type:String,
        required:true
    }
},{timestamps:true}
)
const  User= model("userschema",userSchema);
module.exports= User;
