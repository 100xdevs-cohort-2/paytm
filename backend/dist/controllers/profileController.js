"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, firstName, lastName } = req.body;
        const userId = req.userId;
        console.log("user Id", userId);
        const salt = 10;
        const existingUser = yield User_1.default.findOne({ _id: userId });
        if (!existingUser) {
            res.status(400).json({
                message: "User not found"
            });
            return;
        }
        if (password) {
            const hashPassword = yield bcrypt_1.default.hash(password, salt);
            existingUser.password = hashPassword;
        }
        if (firstName)
            existingUser.firstName = firstName;
        if (lastName)
            existingUser.lastName = lastName;
        yield existingUser.save();
        const data = {
            username: existingUser.username,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName
        };
        res.status(200).json({
            message: "Updated Successfully",
            data
        });
        return;
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(411).json({
                message: e.message
            });
            console.error(e.message);
        }
        else {
            res.status(500).json({
                message: "Unexpected error has occured"
            });
        }
    }
});
const ProfileController = {
    updateProfile
};
exports.default = ProfileController;
