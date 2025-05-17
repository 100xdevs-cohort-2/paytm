import { Router } from "express";
import authRoutes from "./authRoutes";
import accountRoutes from "./accountRoutes";
import profileRouter from "./profileRoutes";
const mainRoutes=Router();


mainRoutes.use("/api/v1/user",authRoutes)

mainRoutes.use('/api/v1/account',accountRoutes)

mainRoutes.use('/api/v1/user',profileRouter)
export default mainRoutes