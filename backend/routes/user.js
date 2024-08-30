const express = require('express');
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require('../middleware');
const router = express.Router();

const signupBody = zod.object({
    userName : zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string().min(8).max(20),
})

router.post("signup" , async(req, res) => {
    const { success } = signupBody.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            message : "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        userName : req.body.userName
    })

    if(existingUser) {
        return res.status(411).json({
            message : "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.create({
        userName : req.body.userName,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName
    })

    const userId = user._id;

    await Account.create({
        userId,
        balance : 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message : "User created successfully",
        token : token
    })
});


const signinBody = zod.object({
    userName : zod.string().email(),
    password : zod.string().min(8).max(20)
});

router.post("/signin" , async (req,res) => {
    const { success } =  signinBody.safeParse(req.body)

    if(!success) {
        return res.status(411).json({
            message : "Incorrect inputs"
        })
    }

    const user = await(User.findOne({
        userName : req.body.userName,
        password : req.body.password
    }))

    if(user) {
        const token = jwt.sign({
            userId : user._id
        } , JWT_SECRET);

        res.json({
            token : token,
            message : "User signed in successfully"
        })

        return;
    }

    res.status(411).json({
        message : "Incorrect username or password"
    });
});

const updateBody = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional(),
})

router.put("/", authMiddleWare, async(req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if(!success) {
        res.status(411).json({
            message : "Error while updating information"
        })
    }

    await User.updateOne({_id : req.userId} , req.body);

    res.json({
        message : "Updated successfully"
    })
})

router.get("/bulk" , async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or : [{
            firstName : {
                "$regex" : filter
            }
        }, {
            lastName : {
                "$regex" : filter
            }
        }]
    })

    res.json ({
        user : users.map(user => ({
            userName : user.userName,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user.id
        }))
    })
})





module.exports = router;