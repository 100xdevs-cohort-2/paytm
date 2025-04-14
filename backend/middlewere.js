const jwtpass = process.env.JWT_SEC 
const jwt = require('jsonwebtoken')



const authvalidator = (req,res,next)=>{
    const authheader = req.headers.authorization
    if(!authheader || !authheader.startsWith('Bearer ')){
        return res.status(403).json({})
    }
    const token = authheader.split(" ")[1]
    try{
        const decode = jwt.verify(token,jwtpass)
        req.userId = decode.userId
        next()
    }
    catch(e){
        return res.status(403).json({})
    }


}

module.exports = authvalidator