const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
// const jwt = require('jsonwebtoken');

const app = express();

// app.use(bodyParser.json()); //same as express.json();
app.use(cors());
app.use(express.json());

// const userRoutes = require("./routes/user");
const mainRouter = require("./routes/index");

app.use("api/v1", mainRouter);

app.listen(8080);
