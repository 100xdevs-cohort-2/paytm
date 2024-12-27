const express = require("express");
const cors = require("cors")
const mainRouter = require("./routes/index.js");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/user",mainRouter)

app.listen(5001,()=>{
    console.log("server started");
})


//api/v1/user/signup
//api/v1/user/signin

//api/v1/account/transfermoney
//api/v1/accpunt/checkbalance