import { Router } from "express";
const router = Router();
import { Account } from "../db.js"
import authMiddleware from "../middlewares.js";
import mongoose from "mongoose";

/**
 * @swagger
 * tags:
 *   name: Account
 *   description: Operations related to user accounts
 */



/**
 * @swagger
 * /api/v1/account/:
 *  get:
 *      summary: Basic Health checkup for account router
 *      description: Basic route to check if backend is up or not
 *      tags: [Account]
 *      responses:
 *          200:
 *              description: Backend System up... 
 */
router.get("/",(req,res)=>{
    res.json({msg:`hello from account router...`})
})

router.use(authMiddleware)

/**
 * @swagger
 * /api/v1/account/balance:
 *   get:
 *     summary: Fetch balance of user
 *     description: Route to check the balance of the currently logged-in user.
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the balance of the logged-in user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *                   description: The balance of the logged-in user.
 *       403:
 *         description: Unauthorized or bad authentication.
 *       500:
 *         description: Internal Server Error
 */
router.get("/balance",async (req,res)=>{
    const userId = req.userId;

    const account = await Account.findOne({userId:userId})
    console.log(userId)
    if(account){
        console.log(`inside if(account)`)
        return res.json({balance: account.balance})
    }
    console.log(`after if(account)`)
    return res.status(500).json({msg:"internal server error..."})
})

/**
 * @swagger
 * /api/v1/account/transfer:
 *  post:
 *    summary: Transfer balance to other user
 *    description: Route to transfer balance to another user
 *    tags: [Account]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              toUserId:
 *                type: string
 *              amount:
 *                type: number
 *    responses:
 *      200:
 *        description: Transfer successful
 *      400:
 *        description: Insufficient balance or invalid request
 *      411:
 *        description: Invalid receiver account
 *      403:
 *        description: Unauthorized or Bad authentication
 *      500:
 *        description: Internal Server Error
 */
router.post("/transfer",async (req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    const {toUserId , amount} = req.body;
    const senderAccount = await Account.findOne({userId:req.userId}).session(session)
    console.log(`senderAccount.balance: ${senderAccount.balance}, amount:${amount}`)
    if(!senderAccount || senderAccount.balance<amount){
        await session.abortTransaction()
        return res.status(400).json({
            msg:"Insufficient balance"
        })
    }

    const recieverAccount = await Account.findOne({userId:toUserId}).session(session);
    if(!recieverAccount){
        session.abortTransaction();
        return res.status(411).json({msg:`Invalid reciever account...`})
    }

    //Transfer of money
    await Account.updateOne({userId: req.userId},{$inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId:toUserId},{$inc:{balance: amount}}).session(session);

    //commit the tran
    await session.commitTransaction();
    res.json({
        msg:`Transfer succesfull...`
    })

})


export default router