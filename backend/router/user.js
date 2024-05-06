const express = require("express");
const router = express.Router();
const z = require("zod");
const { User, Account } = require("../db/index");
const jwt = require("jsonwebtoken");
const  JWT_SECRET  = require("../config");
const { authMiddleware } = require("../middleware/Authmiddleware");
const signupBody = z.object({
    username: z.string().email(),
    firstname: z.string(),
    lastname: z.string(),
    password: z.string()
});
const signinBody = z.object({
    username: z.string().email(),
	password: z.string()
})
router.post("/signup", async (req, res) => {
    const success = signupBody.safeParse(req.body);
   
    console.log(success);
    if (!success) {
        return res.status(400).json({
            msg: "Invalid Input"
        });
    }
 
    const userExists = await User.findOne({ username: req.body.username });
    if (userExists) {
        return res.status(409).json({
            msg: "Username Already exists!"
        });
    }

    try {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
     
   const UserId=user._id;
   await Account.create({
    userId:UserId,
    balance:1+Math.random()*10000
   })
        const token = jwt.sign({ UserId }, "JWT_SECRET");
        console.log(token);
        return res.status(200).json({
            msg: "User seucessfully Created !",
            token: token
            
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "Internal Server Error",error:err.message
        });
    }
});
router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });
    console.log(user)
    if (user) {
      console.log(user)
        const token = jwt.sign({
            UserId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token,
            username:user.firstname
        })
        return ;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})


router.put("/updateProfile", authMiddleware, async (req, res) => {
    const updateUser = z.object({
        username: z.string().optional(),
        password: z.string().optional(),
        firstname: z.string().optional(),
        lastname: z.string().optional()
    });
    const { success } = updateUser.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            msg: "Error while updating information"
        });
    }
    console.log(req.body)
    await User.updateOne({ _id: req.userId }, req.body);
    return res.json({
        msg: "User updated successfully!"
    });
});

router.get("/search",async(req,res)=>{
    const filter=req.query.filter
    console.log(filter)
    const users=User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })
    res.json({
        user:(await users).map(user=>({
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            _id:user._id
        }))
    })

})

module.exports = router;
