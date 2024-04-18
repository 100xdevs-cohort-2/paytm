const express = require("express");
const { router } = require('./routes/index');
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());

app.use('/api/v1', router);
app.listen(3001, () => {
    console.log('Server is running on port 3001');
})

