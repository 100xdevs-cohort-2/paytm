const express= require("express");
const z= require("zod");
const User = require("../models/User")
const jwt= require("jsonwebtoken");
const usertoken=require("../config");
const AuhtorizeUserasync = require("../auth/auhtorization")


const UserRouter= express.Router();

function UserValidation(UserObject){
    
    const validateUserSchema= z.object({
        Fullname: z.string().min(3).max(20),
        Email:z.string().email(),
        Password:z.string().min(6).max(30),
    })
    try {
        const validateUser= validateUserSchema.parse(UserObject);
        console.log(validateUser);
        return true;

    } catch (error) {
        return false;

        
    }

}
UserRouter.get("/updateUser", AuhtorizeUserasync, async (req, res)=>{
    const userID= req.body.userid;
    const UserUpdateObject= {};
    if(req.body.Fullname) UserUpdateObject.Fullname= req.body.Fullname;
    if(req.body.Email) UserUpdateObject.Email= req.body.Email;

    if(req.body.Password) UserUpdateObject.Password= req.body.Password;

    const user= await  User.findOneAndUpdate(userID, UserUpdateObject, {new:true});
    return res.json({
        msg:"the user has been upadted ",
        updateduser:{user}
    })


})

UserRouter.get("/getFriends", AuhtorizeUserasync, async (req, res)=>{
    const Fullname= req.query.filter;
    const usersFiltered= await User.find({Fullname:Fullname});
    const usersfriends=usersFiltered.map(user=> user.Fullname);
    if(!usersFiltered){
        return res.json({
            msg:'no user matched',
        })
    }else{
        return res.json({
            users:{usersfriends},
        })
    }
})

UserRouter.post("/singup",  async (req, res )=>{
    const {Fullname , Email, Password}= req.body;
const UserObject={
    Fullname:Fullname,
    Email:Email,
    Password:Password
}
const valid= UserValidation(UserObject);
if(!valid){
    return res.status(411).json({
        msg:"the user inputs are invalid",
    })
}
const user= await User.findOne({Email:Email});

    
    if(user){
    

    console.log("the user has  been found ")
   

        return res.status(404).json({
        msg:"the user has been found hence cannnot singup wiht these credentials ",
        

    })

    }else{
        console.log("the user has not been found ")
       const user=  await User.create(UserObject);
        const userid= user._id;
        const userJwtToken= jwt.sign({userid}, usertoken);
        console.log("the user has been created");
        return res.status(200).json({
            msg:"the user has been creaed",
            jwt: {userJwtToken},

        })

    }
    

})
function validateUserSigngin(UserSignObject){
    const UserSchemaSingnin= z.object({
        Email:z.string().email(),
        Password:z.string(),
    })
    try {
        const validateUser= UserSchemaSingnin.parse(UserSignObject);
        console.log("the use inputs has been validated ")
        return true;
    } catch (error) {
        
        return false;

    }
}

UserRouter.post("/singin", async (req, res)=>{
    const{ Email, Password}= req.body;
    const UserSignObject=({
        Email,
        Password,
    })
    const valid= validateUserSigngin(UserSignObject);
    if(!valid ){
        return res.status(411).json({
            msg:"the user has not put valid inputs ",
        })
    }
  
    try {
        const user= await User.findOne({
            Email:Email,
            Password:Password,
        })
        const userid= user._id;
        console.log(userid);
        const token =jwt.sign( {userid},usertoken);
        console.log("her we are ")
        return res.json({
            token: {token},
        })

    } catch (error) {
        return res.json({
            masg:"could not sing you in ",
        })
        
    }

})





module.exports= UserRouter;

