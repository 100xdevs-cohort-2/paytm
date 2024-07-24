// backend/routes/user.js
const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const  { authMiddleware } = require("../middleware");
const saltRound = 10;

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const password = req.body.password;
    bcrypt.hash(password,saltRound,async function(err,hash){
        const user = await User.create({
            username: req.body.username,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })
        
            const userId = user._id;
        
            await Account.create({
                userId,
                balance: 1 + Math.random() * 10000
            })
        
            const token = jwt.sign({
                userId
            }, JWT_SECRET);
        
            res.json({
                message: "User created successfully",
                token: token
            })
    })
})


const signinBody = zod.object({
    username: zod.string().email(),
	passwo33rd: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
    });

    bcrypt.compare(req.body.password,user.password,function(err,result){
        if (result) {
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET);
      
            res.json({
                token: token
            })
            return;
        }else{
            console.log(err);
        }
    })
    
    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    bcrypt.hash(req.body.password,saltRound,async function(err,result){
        const checkBody = {
            password: result,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }
        await User.updateOne(checkBody, {
            id: req.userId
        })
    
        res.json({
            message: "Updated successfully"
        })
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;