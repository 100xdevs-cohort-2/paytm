"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validations_1 = __importDefault(require("../middlewares/validations"));
const profileValidation_1 = __importDefault(require("../validations/profileValidation"));
const profileController_1 = __importDefault(require("../controllers/profileController"));
const jwtfromUser_1 = __importDefault(require("../middlewares/jwtfromUser"));
const profileRouter = (0, express_1.Router)();
profileRouter.put('/', jwtfromUser_1.default, (0, validations_1.default)(profileValidation_1.default.updateProfile), profileController_1.default.updateProfile);
exports.default = profileRouter;
