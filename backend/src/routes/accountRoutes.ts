import { Router } from "express";

const accountRoutes=Router();

accountRoutes.post('/transferMoney');

accountRoutes.get('/balance');

export default accountRoutes