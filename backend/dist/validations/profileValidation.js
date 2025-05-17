"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const ProfileValidation = {
    updateProfile: {
        body: joi_1.default.object().keys({
            password: joi_1.default.string().min(8).max(50).optional().messages({
                "string.base": "Password must be string",
                "string.min": "Password must at least of 8 characters long",
                "string.max": "Password mustnot exceed 50 characters long"
            }),
            firstName: joi_1.default.string().min(2).max(50).optional().messages({
                "string.base": "First name must be string",
                "string.min": "First name must at least of 8 characters long",
                "string.max": "First name mustnot exceed 50 characters long"
            }),
            lastName: joi_1.default.string().min(2).max(50).optional().messages({
                "string.base": "Last name must be string",
                "string.min": "Last name must at least of 8 characters long",
                "string.max": "Last name mustnot exceed 50 characters long"
            })
        }).or("password", "firstName", "lastName")
    }
};
exports.default = ProfileValidation;
