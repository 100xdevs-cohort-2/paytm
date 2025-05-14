"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accountRoutes = (0, express_1.Router)();
accountRoutes.post('/transferMoney');
accountRoutes.get('/balance');
exports.default = accountRoutes;
