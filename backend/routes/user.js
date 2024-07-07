const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { User, Account } = require("../db");
const { JWT_SECRETS } = require("../config");
const { authMiddleware } = require("../middileware");
const router = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})
router.post("/signup",async (req,res)=>{
    const userPayload = req.body;
    const parcedPayload = signupBody.safeParse(userPayload);
    if(!parcedPayload.success){
        return res.status(411).json({
            msg: "Email already taken/ Incorrect Inputs"
        })
    }
    const existingUser = await User.findOne({
        username: userPayload.username
    })
    if(existingUser){
        return res.status(411).json({
            msg: "Email already taken"
        })
    }
    const user = await User.create({
        username: userPayload.username,
        firstName: userPayload.firstName,
        lastName: userPayload.lastName,
        password: userPayload.password
    })
    const userId = user._id;
    // creating a new accoutn linked to this user and randomly giving him some money
    await Account.create({
        userId,
        balance: 1 + Math.random()*10000
    })
    const token = jwt.sign({
        userId: userId
    },JWT_SECRETS);

    res.status(200).json({
        msg: "User created successfully",
        token: token
    })
})


const signInbody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})
router.post("/signin",async (req,res)=>{
    const signinPayload = req.body;
    const parcedPayload = signInbody.safeParse(signinPayload);
    if(!parcedPayload.success){
        return res.status(411).msg({
            msg: "incorrect Inputs"
        })
    }

    const user = await User.findOne({
        username: signinPayload.username,
        password: signinPayload.password
    })
    if(user){
        const userId = user._id;
        const token = jwt.sign({
            userId: userId
        },JWT_SECRETS);
        return res.status(200).json({
            token: token
        })
    }else{
        return res.status(411).json({
            msg: "Error while logging in"
        })
    }    
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put("/",authMiddleware,async (req,res)=>{
    const { success } = updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg: "Error while updating information"
        })
    }
    await User.updateOne({_id: req.userId},req.body);
    res.json({
        msg: "Updated SuccessFully"
    })
})

router.get("/bulk",async (req,res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex":filter
            },
        },{
            lastName: {
                "$regex": filter
            }
        }]
    })
    res.json({
        user: users.map(user =>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;