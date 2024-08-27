const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // if(!req) {
    //     console.log("req not defined");
    //     return
    // }
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            messsage: "Kya bhai auth header to bhejo??"
        });
    }
    const token = authHeader.split(' ')[1];
    if(token) {console.log("token found in auth-bearer header -> ", token);}

    try{
        const decoded = jwt.verify(token, JWT_SECRET);  
        if(decoded) {console.log("token decoded -> ", decoded);}

        if(decoded.userId){
            req.userId = decoded.userId;
            console.log("next() to get executed next")
            next();
        } else {
            return res.status(403).json({
                messsage: "Cannot verify token"
            });
        }
    } catch(err) {
        console.log(err);
        return res.status(403).json({
            messsage: "check console for err in authMiddleware catch block"
        });
    }
}

module.exports = authMiddleware