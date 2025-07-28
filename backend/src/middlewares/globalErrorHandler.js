import AppError from "../utils/error.js";

export default function globalErrorHandler(err, req, res, next){
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status : err.status,
        message : err.message || 'Internal Server Error',
    });
}
