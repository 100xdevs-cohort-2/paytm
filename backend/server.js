const mongoose = require("mongoose");
const app = require("./index");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const db = process.env.DATABASE;

mongoose.connect(db).then(() => console.log("Connected to Database"));

const port = 3001;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
