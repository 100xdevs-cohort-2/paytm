const express = require("express");
const mainRouter = require("./routes/index_routes");
const cors = require("cors")
const authvalidator = require("./middlewere")
const app = express();
app.use(express.json());
app.use(cors())

// Use the main router
app.use("/app/v1", mainRouter);

// Root route
app.get("/", (req, res) => {
  res.json({
    msg: "Hey there, how are you!",
  });
});

app.post("/protected",authvalidator,(req,res)=>{
  res.json({
    message:"this is protected site"
  })
})


app.use((err,req,res,next)=>{
  console.log("this is your err : " +err)
  res.send("something went wrong")
})



// Start the server
app.listen(3000, () => {
  console.log("App is live on http://localhost:3000");
});
