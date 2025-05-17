import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

interface IvalidateScehma {
  body?: ObjectSchema;
  query?: ObjectSchema;
  params?: ObjectSchema;
  headers?: ObjectSchema;
}

const validate = (validateSchema: IvalidateScehma = {}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { body, query, params, headers } = validateSchema;

    try {
      if (body) {
        const validationResult = body.validate(req.body, { abortEarly: false });
        if (validationResult.error) throw validationResult.error;
      }

      if (params) {
        const validationResult = params.validate(req.params, {
          abortEarly: false
        });
        if (validationResult.error) throw validationResult.error;
      }

      if (query) {
        const validationResult = query.validate(req.query, {
          abortEarly: false
        });
        if (validationResult.error) throw validationResult.error;
      }

      if (headers) {
        const validationResult = headers.validate(req.headers, {
          abortEarly: false
        });
        if (validationResult.error) throw validationResult.error;
      }

      next();
    } catch (e) {
      if (e instanceof Error) {
        console.log("error", e.message);
        res.status(400).json({
          message: e.message
        });
      } else {
        return res.status(500).json({
          error: "'An unexpected error occurred during validation'"
        });
      }
    }
  };
};
