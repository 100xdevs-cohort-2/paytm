"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const authValidation_1 = __importDefault(require("../validations/authValidation"));
const validations_1 = __importDefault(require("../middlewares/validations"));
const authRoutes = (0, express_1.Router)();
//register users
authRoutes.post("/signup", (0, validations_1.default)(authValidation_1.default.register), authController_1.default.register);
authRoutes.post('/signin', (0, validations_1.default)(authValidation_1.default.login), authController_1.default.login);
exports.default = authRoutes;
