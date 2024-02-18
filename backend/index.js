
const express = require('express')
const rootRouter = require("./routes/index")
const cors = require("cors");

const app = express()
const port = 3000


//routing to the global routers
app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})