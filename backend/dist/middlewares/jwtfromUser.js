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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Ienv_1 = __importDefault(require("../Ienv"));
const getUserfromAuthToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.header("Authorization");
        const authToken = authHeader === null || authHeader === void 0 ? void 0 : authHeader.replace("Bearer ", "");
        if (!authToken) {
            res.status(400).json({
                message: "Authorization token is required"
            });
            return;
        }
        const JWT_Password = Ienv_1.default.JWT_Password;
        const decode = jsonwebtoken_1.default.verify(authToken, JWT_Password);
        if (decode) {
            if (typeof decode === "string") {
                res.status(411).json({
                    message: "Invalide token"
                });
            }
            req.userId = decode.userID;
            console.log(req.userId);
            next();
        }
        else {
            res.status(400).json({
                message: "You are authorized "
            });
        }
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(400).json({
                message: e.message
            });
            console.error(e.message);
        }
        else {
            res.status(500).json({
                message: "Unexpected error has occurred"
            });
        }
    }
});
exports.default = getUserfromAuthToken;
