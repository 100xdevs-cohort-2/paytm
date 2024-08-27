const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "in index.js (main backend server)"
    })
})

app.listen(PORT, (err) => {
    if(err) console.log(err);
    console.log("Server listening on port ", PORT);
})