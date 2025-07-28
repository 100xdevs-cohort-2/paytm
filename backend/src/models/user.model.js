import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import AppError from "../utils/error.js";

const userSchema = new Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 15
    },
    lastName : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 15
    },
    username : {
        type : String,
        unique : true,
        required : true,
        minLength : 3,
        maxLength : 15
    },
    password : {
        type : String,
        required : true,
        minLength : 6,
        maxLength : 20
    }
})


userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(new AppError('Error hashing password: ' + error.message));
  }
});


userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new AppError('Password comparison failed: ' + error.message);
  }
};


export const User = mongoose.model("User", userSchema);