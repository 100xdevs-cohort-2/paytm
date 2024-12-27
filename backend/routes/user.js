const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");


// User SignUp 
const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Incorrect Inputs",
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username,
    });

    if (existingUser) {
        return res.status(411).json({
            message: "Email Already Registered",
        });
    }

    const { username, firstName, lastName, password } = req.body;

    const newUser = await User.create({
        username,
        firstName,
        lastName,
        password
    });

    const userId = newUser._id;

    await Account.create({
        userId,
        balance: parseInt(Math.random() * 1000)
    });

    res.status(200).json({
        message: "User Created Successfully",
    });

});


// User SignIn
const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
});

router.get("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect Inputs",
        });
    }

    const user = await User.findOne({
        username: req.body.username
    })

    if (!user) {
        return res.status(404).json({
            message: "User not found",
        })
    }

    if (user) {
    }
});

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optiona(),
    lastName: zod.string().optional()
});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Error while updating information",
        });
    }

    await User.updateOne({ _id: req.userId }, req.body)

    res.json({
        message:"Updated Successfully"
    })
})




module.exports = router;
