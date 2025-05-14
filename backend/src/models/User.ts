import { model, Schema } from "mongoose"


interface IUser{
    username:string,
    password:string,
    firstName:string,
    lastName:string
}

const UserSchema=new Schema<IUser>({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const User=model<IUser>("User",UserSchema)

export default User