const express = require("express");
const authvalidator = require("../middlewere");
const zod = require("zod");
const { User } = require("../db");

const router = express.Router(); 

// Function to validate request body
const bodyparser = (args) => {
    const schema = zod.object({
        password: zod.string(),
        firstname: zod.string(),
        lastname: zod.string(),
    });
    return schema.safeParse(args);
};

router.put("/", authvalidator, async (req, res) => {
    const parser = bodyparser(req.body);

    if (!parser.success) {
        return res.status(400).json({
            message: "Error while updating information",
            errors: parser.error.errors,
        });
    }

    try {
        await User.updateOne(
            { _id: req.userId }, 
            { $set: req.body }  
        );

        res.json({
            message: "Info Updated successfully!",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
module.exports = router;  
