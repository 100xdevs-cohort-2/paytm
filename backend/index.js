const express = require("express");
const mainRouter = require("./routes/index.js");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1", mainRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port 3000");
});
