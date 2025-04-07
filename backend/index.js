const express = require("express");
const mongoose=require("mongoose");
const { DB_URL } = require("./config");
const { router } = require("./routes");
const { userRouter } = require("./routes/user");
const cors = require('cors');
const { accountRouter } = require("./routes/account");

async function connectDB(){
    try{
        await mongoose.connect(DB_URL);
        console.log("Connected To The DataBase");
    }
    catch{
        console.log("Error in Connecting to the DataBase");
    }
}
connectDB();

const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/v1",router);


app.listen(3000);

