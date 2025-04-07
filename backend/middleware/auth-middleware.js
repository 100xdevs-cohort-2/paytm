

const jwt=require("jsonwebtoken");
const { JWT_SECRET } = require("../config");


const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    const token=authHeader.split(' ')[1];

    try{
        const result=jwt.verify(token,JWT_SECRET)
        req.userId=result.userId;
        next();
    }
    catch{
        res.status(403).send({
            message:"Invalid Request"
        });
        return;
    }
    return;
}

module.exports={
    authMiddleware
}