const express = require("express");
const router = express.Router();
const signupRouter = require("./signup");
const signinRouter = require("./signin");
const authMiddleware = require("../middleware");
const { userUpdate } = require("../types");
const { User } = require("../db");

router.use("/signup", signupRouter);
router.use("/signin", signinRouter);

router.put("/", authMiddleware, async (req, res) => {

    const success = userUpdate.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message: "Enter data in correct format"
        })
    }

    const user = await User.findOne({
        username: req.body.username
    })
    if(user) {
        console.log(user.username, " user found");
    }

    if(req.body.firstName) {
        user.firstName = req.body.firstName;
        console.log("firstname updated");
    }
    if(req.body.lastName) {
        user.lastName = req.body.lastName;
        console.log("lastname updated");
    }
    if(req.body.password) {
        const hashedPassword = await User.createHash(req.body.password);
        user.password_hash = hashedPassword;
        console.log("password updated");
    }
    await user.save();
    return res.status(201).json({
        message: "User details updated"
    })
})

router.get("/bulk", async (req, res) => {
    const filterName = req.query.filter || ""; //Test
    try{
        const filteredUsers = await User.find(
            {$or: [
                {firstName: {$regex: filterName, $options: 'i'}}, 
                {lastName: {$regex: filterName, $options: 'i'}}
            ]},
            {firstName: 1, lastName: 1, _id: 1}
            );
        console.log(filterName, filteredUsers);
        if(filteredUsers.length){
            return res.status(200).json({
                filteredUsers
            })
        } else {
            return res.status(500).json({
                message: "No such user present"
            })
        }
    } catch (err) {
        res.status(411).json({
            message: "Some Error is preventing retrieval"
        })
    }
    
})

module.exports = router;
