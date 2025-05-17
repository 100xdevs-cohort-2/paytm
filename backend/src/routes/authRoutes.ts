import { Router, Request, Response } from "express";
import authController from "../controllers/authController";
import userValidation from "../validations/authValidation";
import validate from "../middlewares/validations";

const authRoutes = Router();

//register users
authRoutes.post("/signup",validate(userValidation.register), authController.register);

authRoutes.post('/signin',validate(userValidation.login),authController.login)

export default authRoutes;
