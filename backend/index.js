const express = require("express");
const mainRouter = require("./routes/index");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen(3000)
/*
/api/v1/user/signup
/api/v1/user/login
/api/v1/user/changePassword


/api/v2/account/transferMoney
/api/v2/account/balance

*/