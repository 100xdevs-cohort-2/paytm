const mongoose = require('mongoose');

require("dotenv").config();

mongoose.connect(
    "mongodb+srv://admin:"+
        process.env.MONGO_PASSWORD+
        "@cluster0.pyvfpn0.mongodb.net/?retryWrites=true&w=majority", 
)
.then((x)=>{
    console.log("Connected to Mongodb");
})
.catch((err)=>{
    console.log("Error while connecting to Mongodb");
});

const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type: String,
        required : true
    },
    username : {
        type : String,
        required : true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password : {
        type : String,
        required : true,
        private : true,
        minLength : 6
    },
});

const AccountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    balance : {
        type : Number,
        required : true
    },
});

const User = mongoose.model("User_paytm", UserSchema);
const Account = mongoose.model("Account", AccountSchema);

module.exports = {
    User,
    Account,
} 