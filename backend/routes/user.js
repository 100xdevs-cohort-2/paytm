const express = require("express");
const zod = require("zod");
const User = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

router = express.Router();

const validUserSchema = zod.object({
    username: zod.string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(20, { message: "Username must be at most 20 characters long" })
        .trim(),

    password: zod.string()
        .min(3, { message: "Password must be at least 3 characters long" })
        .max(20, { message: "Password must be at most 20 characters long" })
        .trim(),

    firstName: zod.string()
        .trim()
        .min(1, { message: "First name is required" })
        .max(30, { message: "First name must be at most 30 characters long" }),

    lastName: zod.string()
        .min(1, { message: "Last name is required" })
        .trim()
        .max(30, { message: "Last name must be at most 30 characters long" })
});

router.post("/signup", async (req,res) => {
    console.log("something got hit");
    console.log(req.body);
    const validationResult = validUserSchema.safeParse(req.body);
    if (!validationResult.success) {
        return res.json({
            message: "Invalid input",
            errors: validationResult.error.errors
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username
    });

    if (existingUser){
        return res.status("400").json({ 
            message: "User Already exists"
        });
    }

    const current_user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    const userId = current_user._id;

    const token = jwt.sign({userId},JWT_SECRET);

    res.json({
        message: "user created successfully",
        token: token
    });
    
});

router.get("/signup",(req,res) =>{
    res.send("get works fine");
})


module.exports = router;

