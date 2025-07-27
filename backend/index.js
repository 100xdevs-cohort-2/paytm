import express from "express";
import cors from "cors"
import {rootRouter} from "./routes/index.js";
import { PORT } from "./config.js";

const app=express();

//Middlewares 
app.use(cors());
app.use(express.json());

//handling all the routes
app.use('/api/v1',rootRouter);

app.listen(PORT,()=>{
    console.log(`Server listening on port: ${PORT}`)
});