const express = require("express");
const cors = require("cors");
const { connectToMongoDb } = require("./config");
const userRoute = require("./routes/user");
const bankRoute = require("./routes/bank");
const app = express();

const CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/account", bankRoute);

connectToMongoDb(CONNECTION_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });