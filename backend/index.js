const express = require("express");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const mainRouter = require("./routes/index");

const app = express();

app.use("/api/v1", mainRouter);
app.listen(3000);

// /api/v1/user/signup
// /api/v1/user/signin
// /api/v1/user/changePassword ....

// /api/v1/account/transferMoney
// /api/v1/account/balance