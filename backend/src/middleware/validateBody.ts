// middlewares/validateBody.ts

import { Request, Response, NextFunction } from "express";
import {ValidationError} from "../services/errors.js";


type ValidatorFn = (body: any) => void;

export const validateBody = (validator: ValidatorFn) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            validator(req.body);
            next();
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json({ error: error.message });
            } else {
                next(error);
            }
        }
    };
};
