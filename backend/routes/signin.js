const express = require("express");
const { userLogin } = require("../types");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const router = express.Router();

router.post("/", async (req, res) => {
    const payload = req.body;
    const parsedPayload = userLogin.safeParse(payload);
    if(!parsedPayload.success){
        res.status(411).json({
            message: "Enter Username/Password in correct format"
        })
    }
    const user = await User.findOne({
        username: parsedPayload.data.username
    })
    if(user){
        if(await User.validatePassword(parsedPayload.data.password, user.password_hash)){
            const userId = user._id;
            const jwtToken = jwt.sign({userId}, JWT_SECRET);
            res.status(200).json({
                message: "User Logged In",
                token: jwtToken
            });
        } else {
            res.status(411).json({
                message: "Wrong Password!"
            })
        }
        return;
    } else {
        return res.status(411).json({
            message: "Wrong username/password"
        })
    }
})

module.exports = router;