import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

interface IvalidateScehma {
  body?: ObjectSchema;
  query?: ObjectSchema;
  params?: ObjectSchema;
  headers?: ObjectSchema;
}

const validate = (validateSchema: IvalidateScehma = {}) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { body, query, params, headers } = validateSchema;
    
    try {
      if (body) {
        const validationResult = await body.validateAsync(req.body, { abortEarly: false });
        req.body = validationResult;
      }

      if (params) {
        const validationResult = await params.validateAsync(req.params, { abortEarly: false });
        req.params = validationResult;
      }

      if (query) {
        const validationResult = await query.validateAsync(req.query, { abortEarly: false });
        req.query = validationResult;
      }

      if (headers) {
        const validationResult = await headers.validateAsync(req.headers, { abortEarly: false });
        req.headers = validationResult;
      }

      next();
    } catch (e) {
      if (e instanceof Error) {
        console.log("error", e.message);
        res.status(400).json({
          message: e.message
        });
        return;
      }
      res.status(500).json({
        error: "An unexpected error occurred during validation"
      });
      return;
    }
  };
};

export default validate;