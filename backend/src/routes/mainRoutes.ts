import { Router } from "express";
import authRoutes from "./authRoutes";
import accountRoutes from "./accountRoutes";
const mainRoutes=Router();


mainRoutes.use("/api/v1/user",authRoutes)

mainRoutes.use('/api/v1/account',accountRoutes)

export default mainRoutes