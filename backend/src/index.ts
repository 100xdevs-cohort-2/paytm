import express from "express";
import env from "./Ienv";
import connectToMongoDB from "./connect";
import mainRoutes from "./routes/mainRoutes";
import cors from 'cors'
const server = express();
const port = env.PORT || "8001";
server.use(cors())
server.use(express.json());

connectToMongoDB().then((connectMessage) => {
  console.log(connectMessage);
  server.use(mainRoutes)
  server.listen(port, () => {
    console.log("Server started on port: ", port);
  });
}).catch((e)=>{
    console.log(e)
});
