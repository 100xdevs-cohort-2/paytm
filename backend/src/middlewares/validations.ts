import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

interface ValidationSchemas {
    body?: ObjectSchema;
    params?: ObjectSchema;
    query?: ObjectSchema;
    headers?: ObjectSchema;
}

const validate = (validationSchemas: ValidationSchemas = {}) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { body, params, query, headers } = validationSchemas;

        try {
            if (body) {
                const validationResult = body.validate(req.body, { abortEarly: false });
                if (validationResult.error) throw validationResult.error;
            }

            if (params) {
                const validationResult = params.validate(req.params, { abortEarly: false });
                if (validationResult.error) throw validationResult.error;
            }

            if (query) {
                const validationResult = query.validate(req.query, { abortEarly: false });
                if (validationResult.error) throw validationResult.error;
            }

            if (headers) {
                const validationResult = headers.validate(req.headers, { abortEarly: false });
                if (validationResult.error) throw validationResult.error;
            }

            next();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Validation error:', error);
                res.status(400).json({
                    error: error.message,
                    details: (error as any)?.details || null
                });
            } else {
                console.error('Unexpected validation error:', error);
               res.status(500).json({ error: 'An unexpected error occurred during validation' });
            }
        }
    };
};

export default validate;