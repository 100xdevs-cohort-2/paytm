const usertoken= require("../config");
const jwt= require("jsonwebtoken");

const  AuhtorizeUser=(req, res,next)=>{
    const auth= req.headers["authorization"];
    if(!auth){
        return res.json({
            msg:"no header is there in yout headers ",
        })
    }
    const token = auth.split(" ")[1];
    jwt.verify(token, usertoken , (err, decoded)=>{
        if(err){
            return res.json({
                msg:"the user cannot be verified",
            })
        }
        req.user= decoded;
        next();

    })

}
module.exports= AuhtorizeUser;