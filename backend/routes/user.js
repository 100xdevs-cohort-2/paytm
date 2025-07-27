import express from "express";
import { z } from "zod";
import { Account, User } from "../db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import { authMiddleware } from "../middleware.js"

const signupBody = z.object({
    username: z.string().email(),
    firstName: z.string().max(50),
    lastName: z.string().max(50),
    password: z.string().min(6)
});

export const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    try {
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken"
            })
        }
        const user = await User.create({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        });
        await Account.create({
            userId: user._id,
            balance: 1 + Math.random() * 1000
        })
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)
        res.status(200).json({
            message: "User created successfully",
            token: token
        })
    } catch (error) {
        throw error;
    }
})

const signinBody = z.object({
    username: z.string().email(),
    password: z.string().min(6)
})

userRouter.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });

        if (!user) {
            res.status(411).json({
                message: "Error while logging in"
            })
        }

        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })

    } catch (error) {
        throw error;
    }
})

const updateUser = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

userRouter.put('/', authMiddleware, async (req, res) => {
    if (!updateUser.safeParse(req.body).success) {
        res.status(411).json({
            message: "Error while updating information"
        });
    }
    try {
        await User.updateOne({ _id: req.userId }, { $set: req.body });
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

userRouter.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.query.filter || '';
    const users = await User.find({
        $or: [
            {
                firstName: {
                    "$regex": filter
                }
            },
            {
                lastName: {
                    "$regex": filter
                }
            },
        ]
    });

    res.json({
        user: users.map(user => {
            return {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }
        })
    })
})