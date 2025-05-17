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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Ienv_1 = __importDefault(require("../Ienv"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, firstName, lastName } = req.body;
        const salt = 10;
        const existingUser = yield User_1.default.findOne({ username });
        if (existingUser) {
            res.status(400).json({
                message: "Username is already taken"
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = yield User_1.default.create({
            username,
            password: hashedPassword,
            firstName,
            lastName
        });
        res.status(201).json({
            user: newUser,
            message: "User created successfully"
        });
        return;
    }
    catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Unknown error occurred";
        res.status(500).json({ message: errorMessage });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const existingUser = yield User_1.default.findOne({ username });
        if (!existingUser) {
            res.status(400).json({
                message: "User not found"
            });
            return;
        }
        const passwordCompare = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!passwordCompare) {
            res.status(400).json({
                message: "Incorrect Password"
            });
            return;
        }
        const JWT_Password = Ienv_1.default.JWT_Password;
        const token = jsonwebtoken_1.default.sign({ userID: existingUser._id }, JWT_Password);
        const data = {
            username: existingUser.username,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName
        };
        res.status(200).json({
            message: "Login Successfully",
            data,
            token
        });
        return;
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(400).json({
                message: e.message
            });
        }
        else {
            res.status(500).json({ message: "Unexpected error has occured" });
        }
    }
});
const authController = {
    register,
    login
};
exports.default = authController;
