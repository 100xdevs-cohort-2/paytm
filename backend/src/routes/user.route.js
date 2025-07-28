import express from 'express';
import { userLogin, userSignup, userLoginCheck, getAllUsers } from '../controllers/user.controller.js';
import { authenticateUser, jwtSign } from '../middlewares/jwt.js';

const router = express.Router();

router.get('/user/me', authenticateUser, userLoginCheck)
router.get('/user/all', authenticateUser, getAllUsers)
router.post('/user/login', jwtSign, userLogin);
router.post('/user/signup',jwtSign, userSignup);

export default router;
