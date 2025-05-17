import Joi from "joi";
import { IUser } from "../models/User";

const userValidation = {
  register: Joi.object<IUser>({
    username: Joi.string().alphanum().min(2).max(50).required().messages({
      "string.empty": "Username is required",
      alphanumempty:
        "Username must contain at least one alphanumeric characters",
      "string.min": "Username must be at least 3 characters long",
      "string.max": "Username must not exceed 50 characters"
    }),
    password: Joi.string().min(8).max(50).required().messages({
      "password.empty": "Password is required",
      "password.min": "Passsword must be at least 8 character",
      "password.max": "Password must not exceed 50 characters"
    }),
    firstName: Joi.string().min(2).max(50).required().messages({
      "string.empty": "First name is required",
      "string.min": "Username must be at least 3 characters long",
      "string.max": "Username must not exceed 50 characters"
    }),
    lastName: Joi.string().min(2).max(50).required().messages({
      "string.empty": "First name is required",
      "string.min": "Username must be at least 3 characters long",
      "string.max": "Username must not exceed 50 characters"
    })
  })
};


export default userValidation;