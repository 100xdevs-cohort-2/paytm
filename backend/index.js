const express = require("express");

const app = express();

const cors = require("cors");

const PORT = 3000;
app.use(cors());
app.use(express.json());

const mainrouter = require("./Routes/index");

app.use("/api/v1", mainrouter);

app.listen(PORT, function () {
  console.log(`server listening on port ${PORT}`);
});
