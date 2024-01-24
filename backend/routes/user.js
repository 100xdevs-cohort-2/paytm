const express=require("express");
const router=express.Router();
const {User, Account}=require("../db/db");
const zod = require("zod");
const jwt = require('jsonwebtoken');
const {authMiddleware} = require("../middleware/auth");
require("dotenv").config();


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
            message: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
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
    }, process.env.JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()

});

router.put("/", authMiddleware, async(req, res) =>{
    const {success} = updateBody.safeParse(req.body);

    if (!success){
        res.status(411).json({
            message : "Error alert!!! Update not possible"
        })
    }

    await User.updateOne(req.body, {
        id : req.userId
    })

    res.json({
        message : "Update Successfull"
    })
})

//how to implement like query in mongodb, this syntax is tricky but very helpful....
router.get("/bulk", authMiddleware,async(req, res) =>{
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
        user: users.map(function (user) {
            if(user._id!=req.userId){
                return({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        })}
        else{
            return({
                username: "Current User",
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            })
        }
    })
    })
})

module.exports = router;
