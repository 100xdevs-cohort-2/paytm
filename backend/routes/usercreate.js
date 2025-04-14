const express = require('express');
const { User } = require('../db'); // Import User model
const z = require('zod');
const router = express.Router();
require('dotenv').config()
const jwtpass = process.env.JWT_SEC
const jwt = require("jsonwebtoken")
const bcrypt  = require("bcrypt")
const {Balance} = require("../db");
const authvalidator = require('../middlewere');



// Function to parse and validate input
const argsparse = (args) => {
  const schema = z.object({
    username: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    password: z.string(),
  });
  return schema.safeParse(args);
};

const saltround = 10;
const hashedpassword = async(args)=>{
  try{
    return await bcrypt.hash(args,saltround)
  }
  catch(e){
    throw e 
  }
}


const token = (args)=>{
return jwt.sign(args,jwtpass)


}

router.get("/getuser", authvalidator, async (req, res) => {
  const user = await User.findOne({
    _id: req.userId,
  });
  res.json(user);
});

// Create a user
router.post('/', async (req, res) => {
  const parse = argsparse(req.body);
  if (parse.success) {
    const { username, firstname, lastname, password } = req.body;

    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({
          msg: 'User already exists',
        
        });
      }
      const hashedpass = await hashedpassword(password)
      const newUser = new User({ username, firstname, lastname, password:hashedpass });
      await newUser.save();
      const payload = { userId: newUser._id };
      const userToken = token(payload);
      const userId =newUser._id
      await Balance.create({
        userId,
        balance:1+Math.random()*10000
      })
      return res.status(201).json({
        msg: 'User created',
        jwt: userToken  
    });
    
    } catch (err) {
      res.status(500).json({
        msg: 'Internal server error',
        error: err,
      });
    }
  } else {
    res.status(400).json({
      msg: 'Invalid input',
      errors: parse.error.errors,
    });
  }
});

module.exports = router;
