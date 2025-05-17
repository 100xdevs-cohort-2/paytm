"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (validateSchema = {}) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { body, query, params, headers } = validateSchema;
        try {
            if (body) {
                const validationResult = yield body.validateAsync(req.body, { abortEarly: false });
                req.body = validationResult;
            }
            if (params) {
                const validationResult = yield params.validateAsync(req.params, { abortEarly: false });
                req.params = validationResult;
            }
            if (query) {
                const validationResult = yield query.validateAsync(req.query, { abortEarly: false });
                req.query = validationResult;
            }
            if (headers) {
                const validationResult = yield headers.validateAsync(req.headers, { abortEarly: false });
                req.headers = validationResult;
            }
            next();
        }
        catch (e) {
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
    });
};
exports.default = validate;
