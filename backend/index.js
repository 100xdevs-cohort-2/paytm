const express = require("express");
const router = require("./routes/index");
const bodyParser= require("body-parser")
const cors = require("cors");
const Port= 3000;

const app= express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api/v1", router);


app.listen(Port, ()=>{
    console.log("the server has stared ");
})

