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
const mongoose_1 = __importDefault(require("mongoose"));
const Ienv_1 = __importDefault(require("./Ienv"));
const connectToMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoDBUrl = Ienv_1.default.MONGODB_URL;
    if (!mongoDBUrl) {
        return Promise.reject("MongoDB URl isnot defined properly in environment variables");
    }
    try {
        yield mongoose_1.default.connect(mongoDBUrl);
        return "Mongoose connected";
    }
    catch (error) {
        if (error instanceof Error) {
            return Promise.reject(error.message);
        }
        return Promise.reject("An unknown error occurred while connecting to MongoDB");
    }
});
exports.default = connectToMongoDB;
