import { Router } from "express";
import userRouter from "./user.js";
import accountRouter from "./account.js";
const router = Router();

router.use("/user",userRouter)
router.use("/account",accountRouter)

/**
 * @swagger
 * /api/v1/test:
 *  get:
 *      summary: Secondary Health checkup route
 *      description: Basic route to check if backend is up or not
 *      responses:
 *          200:
 *              description: Backend System is up an running...
 */
router.get("/test",(req,res)=>{
    res.json({msg:"hello from backend/routes/index.js"})
})

export default router;
