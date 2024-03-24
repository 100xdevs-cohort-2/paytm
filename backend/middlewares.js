import jwt from "jsonwebtoken";
import JWT_SECRET from "./config.js";
import User, { Account } from "./db.js";

async function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;

    if(!(authHeader && authHeader.startsWith(`Bearer `))){
        return res.status(403).json({msg:"Bad authentication..."})
    }

    const token = authHeader.split(' ')[1];
    try{
        jwt.verify(token,JWT_SECRET,async (err,user)=>{
            if(err){
                return res.status(403).json({msg:`bad authentication...`})
            }
            req.username = user.username;
            const savedUser = await User.findOne({username:user.username})
            req.userId = savedUser._id;
            // req.userId = user._id;
            // console.log(`middleware sets username: ${JSON.stringify(req.body.username)}`)
            console.log(`middleware sets username: ${req.username}, userId: ${req.userId}`)
            next();
        })
        
    }
    catch(err){
        console.log(`error in authMiddleware : ${err}`)
        return res.status(403).json({msg:`error in authMiddleware...`})
    }

}

export default authMiddleware