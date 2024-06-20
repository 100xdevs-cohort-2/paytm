const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");

const authMiddleware = (req,res, next) => {
    const authHeader = req.headers.authorization;
    console.log("authhead is: " + authHeader);
    if (!authMiddleware){
        return res.status(403).json({message:"wrong token"});
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        if (decoded.userId){
            req.userId = decoded.userId;
            next();
        }
        else{
            res.status(400).json({message: "no user id"});
        }
    }
    catch{
        res.status(403).json({message: "invalid token"});
    }
};

module.exports = authMiddleware;