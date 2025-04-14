    const express = require('express');
    const { User } = require('../db'); 
    const z = require('zod');
    const router = express.Router();
    require('dotenv').config();
    const jwt = require("jsonwebtoken");
    const bcrypt  = require("bcrypt")
  
    const jwtpass = process.env.JWT_SEC;

    const argsparse = (args) => {
        const schema = z.object({
            username: z.string(),
            password: z.string()
        });
        return schema.safeParse(args);
    };


    const token = (args) => {
        return jwt.sign(args, jwtpass);
    };

    router.post('/', async (req, res) => {
        const { username, password } = req.body;
      
        try {
          // Check if user exists
          const user = await User.findOne({ username });
          if (!user) {
            return res.status(400).json({ msg: 'Invalid username or password' });
          }
      
          // Compare password
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid username or password' });
          }
      
          // Generate JWT token
          const payload = { userId: user._id };
          const userToken = token(payload);
      
          res.status(200).json({
            msg: 'Login successful',
            jwt: userToken,
          });
        } catch (err) {
          res.status(500).json({ msg: 'Internal server error', error: err });
        }
      });
      
    module.exports = router;
