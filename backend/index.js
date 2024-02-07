const express = require("express");
const mongoose = require("mongoose");
const app = express();
// mongoose.connect("mongodb://localhost:27017");

const cors = require("cors");

const PORT = 3000;
app.use(cors());
app.use(express.json());

const mainrouter = require("./Routes/index");
const userrouter = require("./Routes/user");
const account = require("./Routes/account");

app.use("/api/v1/user", userrouter);
app.use("/api/v2/account", account);

// app.use("/api/v1/", () => mainrouter);

app.get("/hello", function (req, res) {
  res.send("hello");
});

app.listen(PORT, function () {
  console.log(`server listening on port ${PORT}`);
});
