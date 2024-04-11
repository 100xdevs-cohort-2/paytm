const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();

app.use(cors()); //enabling the cross origing resoure sharing policy since frontend and backend are two differnt origins,
//frontend will request from backend.

app.use(express.json()); //parses the JSON  //request body-parser
app.use("/api/v1", rootRouter);

app.listen(3000, () => {
	console.log(`server is up and running`);
});
