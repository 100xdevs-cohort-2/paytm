import { Router } from "express";
const router = Router();
import User, { Account } from "../db.js"
import zod from "zod"
import bcrypt from "bcrypt"
import JWT_SECRET from "../config.js"
import jwt from "jsonwebtoken"
import authMiddleware from "../middlewares.js";
// import pkg from 'jsonwebtoken';
// const { jsonwebtoken: jwt } = pkg;

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operations related to user profile
 */


const rgx = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
function generateAccessToken(username) {
    return jwt.sign(username, JWT_SECRET, { expiresIn: '1800s' }
    );
  }

/**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     summary: Sign up a new user
 *     description: Route to sign up a new user, regex for phone number = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns JWT token of the created user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token of the created user.
 *       401:
 *         description: Username, phone number, or email already exists.
 *       403:
 *         description: Unauthorized or bad authentication.
 *       411:
 *         description: Incorrect inputs.
 *       500:
 *         description: Internal Server Error
 *       502:
 *         description: Error in saving data in database.
 */
router.post(`/signup`,async (req,res)=>{
    const newUser = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber
    }
    //input validation
    const userSchema = zod.object({
        email: zod.string().min(1).email(),
        username: zod.string().min(1),
        password: zod.string().min(1),
        firstName: zod.string(),
        lastName: zod.string(),
        phoneNumber: zod.string().regex(rgx, 'Invalid Number!')
    })
    const isUserValid = userSchema.safeParse(newUser)
    if(!isUserValid.success){
        console.log(`isuservalid block...`)
        return res.status(411).json({msg: `incorrect inputs...`})
    }

    const checkUsername = await User.findOne({username: newUser.username})
    if(checkUsername){
        console.log(`username exists block...`)
        return res.status(401).json({msg:"username already exists"})
    }

    const checkEmail = await User.findOne({email: newUser.email})
    if(checkEmail){
        console.log(`chekEmail block...`)
        return res.status(401).json({msg:"email already exists"})
    }
    
    const checkPhone = await User.findOne({phoneNumber: newUser.phoneNumber})
    if(checkPhone){
        console.log(`checkPhone block...`)
        return res.status(401).json({msg:"phoneNumber already exists"})
    }

    async function hashPwd(plainTextPassword) {

        // Hashing user's salt and password with 10 iterations,
        const saltRounds = 10;
      
        // First method to generate a salt and then create hash
        const salt = await bcrypt.genSalt(saltRounds);
        return bcrypt.hash(plainTextPassword, salt);
      
        // Second mehtod - Or we can create salt and hash in a single method also
        // return await bcrypt.hash(plainTextPassword, saltRounds);
      };
    
    const hashedPwd = await hashPwd(newUser.password)
    newUser.password = hashedPwd;

    const savedUser = await User.create(newUser)

    const userId = savedUser._id
    const savedAccount = await Account.create({
        userId,
        balance: 1 + Math.random() * 10000 
    })
    console.log(`balance initilised = ${savedAccount.balance}`)

    if(savedUser && savedAccount){
        console.log(`user save block...`)
        
        return res.status(200).json({msg:` user ${newUser.username} created...`,
                                    token: generateAccessToken({username:newUser.username})
                                    });
    }
    else{
        return res.status(502).json({msg:"error in saving data in db..."})
    }
})


/**
 * @swagger
 * /api/v1/user/signin:
 *   post:
 *     summary: Sign In a user
 *     description: Route to sign in a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns JWT token of the created user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token of the created user.
 *       400:
 *         description: Incorrect credentials....
 *       403:
 *         description: Unauthorized or bad authentication.
 */
router.post('/signin',async(req,res)=>{
    const signInBody = {
        username: req.body.username,
        password: req.body.password
    }
    async function validatePwd (candidatePassword,actualPwd) {
        return await bcrypt.compare(candidatePassword, actualPwd);
    }

    const user = await User.findOne({username:signInBody.username})
    if(!user){
        return res.status(400).json({msg:`user ${signInBody.username} not found...`})
    }
    // console.log(user.password)
    console.log(`validatePwd(${signInBody.password},${user.password})`)
    if(await validatePwd(signInBody.password,user.password)) {
        return res.status(200).json({
          message: `User ${signInBody.username} Successfully Logged In`,
          token: generateAccessToken({username: signInBody.username})
        });
      } else {
        return res.status(400).json({
          message: "Incorrect Password",
        });
      }
})

router.use(authMiddleware)


/**
 * @swagger
 * /api/v1/user/:
 *   get:
 *     summary: Authentication check...
 *     description: Route to check whether user is authenticated?
 *     tags: [User]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: User authenticated...
 *       403:
 *         description: Unauthorized or bad authentication.
 */
router.get('/',(req,res)=>{
    return res.status(200).json({msg:`Ok Report`})
})


/**
 * @swagger
 * /api/v1/user/user:
 *   put:
 *     summary: Update user details...
 *     description: Route to Update user details
 *     tags: [User]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Data Updated Succesfully...
 *       403:
 *         description: Unauthorized or bad authentication.
 *       411:
 *         description: Wrong inputs/Password cannot be updated from here.
 */
router.put('/user',async (req,res)=>{
    const updateBodySchema = zod.object({
        email: zod.string().min(1).email().optional(),
        // password: zod.string().min(1).optional(),
        firstName: zod.string().optional(),
        lastName: zod.string().optional(),
        phoneNumber: zod.string().regex(rgx, 'Invalid Number!').optional()
    })
    if(req.body.password){
        return res.status(411).json({msg:`password cannot be sent to update...`})
    }
    const parsed = updateBodySchema.safeParse(req.body);
    if(!parsed.success){
        res.status(411).json({msg:"input validation failed..."})
    }
    console.log(req.body)
    const updateDone = await User.updateOne({
        username: req.username
    },req.body)
    res.json({msg:`Data updated successfully for ${req.username}`})
})

/**
 * @swagger
 * /api/v1/user/searchUsers:
 *   get:
 *     summary: Search other users..
 *     description: Route to see/filter all other users
 *     tags: [User]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the list of users matching the search
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: array
 *                   description: The list of users.
 *       403:
 *         description: Unauthorized or bad authentication.
 */
router.get("/searchUsers",async (req,res)=>{
    const filter= req.query.filter || "";
    console.log(`filter: ${filter}`)
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        },{
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        users: users.map((user)=>{
            return {
                userId: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
            }
        })
    })
})


export default router