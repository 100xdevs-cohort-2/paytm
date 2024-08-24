const express = require("express");
const  rootRouter = require('./routes/index')
const userRouter = require('./routes/user')
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const zod = require('zod');
const { User } = require("./db");
const { JWT_SECRET } = require("./config");

app.use(cors);
const app = express();
const router = express.Router();

router.use("/user", userRouter)

app.use("api/v1", rootRouter);

const signupBody = zod.object({
    username : zod.string().email(),
    firstName : zod.string(),
    lastName: zod.string(),
    password : zod.string().min(8).max(32)
})

router.post("/signup" , async(req, res) => {
    const { success } = signupBody.safeParse(req.body);
    if(!success) {
        return res.status(411).json({message : "Email already taken / Incorrect Inputs"})
    }

    const existingUser = await User.findOne({
        userName : req.body.userName
    })

    if(existingUser) {
        return res.status(411).json({message : "Email already taken / Incorrect Inputs"})
    }

    const user = await User.create({
        username : req.body.username,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName
    });

    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message : "User created successfully",
        token : token
    });

})

app.listen(3000);

module.exports = router;



