import express from "express"
import cors from "cors"
import router from "./routes/index.js"
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from"swagger-ui-express";

const app = express();
app.use(cors());
app.use(express.json())


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title:"Share2Pay",
            version: "1.0.0"
        },
        servers: [
            {
                url:"http://localhost:3000"
            }
        ],
        components: {
            securitySchemes: {
              bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
              },
            },
          },
          security: [{ bearerAuth: [] }]
    },
    apis: ["./index.js","./routes/index.js","./routes/account.js","./routes/user.js"]
}

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 *  get:
 *      summary: Basic Health checkup route
 *      description: Basic route to check if backend is up or not
 *      responses:
 *          200:
 *              description: Backend System up... 
 */
app.get('/',(req,res)=>{
    res.json({msg:"hello from backend/inde.js"})
})

app.use("/api/v1",router)

app.listen(3000,()=>{
    console.log(`server up and running on 3000`)
})