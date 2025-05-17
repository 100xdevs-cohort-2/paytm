import Joi from "joi";

const ProfileValidation = {
  updateProfile: {
    body: Joi.object().keys({
      password: Joi.string().min(8).max(50).optional().messages({
        "string.base": "Password must be string",
        "string.min": "Password must at least of 8 characters long",
        "string.max": "Password mustnot exceed 50 characters long"
      }),
      firstName: Joi.string().min(2).max(50).optional().messages({
        "string.base": "First name must be string",
        "string.min": "First name must at least of 8 characters long",
        "string.max": "First name mustnot exceed 50 characters long"
      }),
      lastName: Joi.string().min(2).max(50).optional().messages({
        "string.base": "Last name must be string",
        "string.min": "Last name must at least of 8 characters long",
        "string.max": "Last name mustnot exceed 50 characters long"
      })
    }).or("password", "firstName", "lastName")
  }
};

export default ProfileValidation