const express = require("express");
const RootRouter=require("./routes/index");
const cors=require("cors");


const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/v1",RootRouter);
app.listen(3000)





