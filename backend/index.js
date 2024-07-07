const express = require("express");
const mainRouter = require("./routes/index");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
// all the req for /api/v1 goes to mainRouter i.e /routes/index.js
app.use("/api/v1",mainRouter);

app.listen(3000,()=>{
    console.log("listening on port 3000");
})
