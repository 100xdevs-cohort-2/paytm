import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

export const authMiddleware=(req,res,next)=> {
    const authToken=req.headers.authorization;
    if(!authToken || !authToken.startsWith('Bearer')){
        return res.status(403).json({
            message: 'Invalid Token'
        });
    }
    const token=authToken.split(' ')[1];
    
    try {
        const payload=jwt.verify(token,JWT_SECRET);
        req.userId=payload.userId;
        next();
    } catch (error) {
        res.status(403).json({
            message: 'Invalid token after verify'
        });
    }
}
    