const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");
const port = 8000;

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/v1", rootRouter);

app.listen(port, ()=>{
    console.log("App is running on the port : " + port);
});

