import dotenv from 'dotenv';
dotenv.config()
import jwt from 'jsonwebtoken';
import AppError from '../utils/error.js';

export function jwtSign(req, res, next){
    try {
        console.log(req.body)
        const {username} = req.body;
        if(!username) throw new AppError('Username is required', 400);
        const token = jwt.sign({username}, process.env.JWT_SECRET, { expiresIn: '1h'});
        if(!token) return res.status(500).json({status: 'error', message: 'Failed to sign JWT'});
        req.token = token;
        next();
    } catch (error) {
        throw new AppError('Error signing JWT: ' + error.message, 404);
    }
}


export function jwtVerify(token){
    try {
        return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) throw new AppError('Invalid token: ' + err.message, 401);
            return decoded;
        })
    } catch (error) {
        throw new AppError('Error verifying JWT: ' + error.message, 401);
    }
}


export function authenticateUser(req, res, next){
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError('Authorization header is missing or invalid', 401);
        }
        const token = authHeader.split(' ')[1];
        if(!token) return res.status(401).json({status: 'fail', message: 'Token is required'});
        const user = jwtVerify(token);
        req.user = user;
        next();
    } catch (error) {
        throw new AppError('Authentication failed: ' + error.message, 401);
    }
}
