const express = require("express");
const router = express.Router();
const { userSignup } = require("../types");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

router.post("/", async (req, res) => {
    const payload = req.body;
    const parsedPayload = userSignup.safeParse(payload);
    if(!parsedPayload.success) {
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
        return;
    }

    try {
        const existingUser = await User.findOne({
            username: parsedPayload.data.username
        });

        if(existingUser){
            return res.status(411).json({
                message: "Username already taken"
            })
        } else {

            const hashedPassword = await User.createHash(parsedPayload.data.password);
            const newUser = await User.create({
                username: parsedPayload.data.username,
                firstName: parsedPayload.data.firstName,
                lastName: parsedPayload.data.lastName,
                password_hash: hashedPassword
            })
            
            const userId = newUser._id;
            
            await Account.create({
                userId: userId,
                balance: 1 + Math.floor(Math.random()*10000)
            })
            
            const jwtToken = jwt.sign({userId}, JWT_SECRET);
            
            return res.status(201).json({
                message: "User created successfully",
                token: jwtToken
            });
        }
    } catch(err) {
        console.log(err);
    }
})


module.exports = router;