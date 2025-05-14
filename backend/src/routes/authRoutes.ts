import { Router, Request, Response } from "express";
import authController from "../controllers/authController";

const authRoutes = Router();

//register users
authRoutes.post("/signup", authController.register);


export default authRoutes;
