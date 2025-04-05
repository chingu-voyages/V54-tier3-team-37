import {NextFunction, Request, Response} from "express";
import {ValidationError} from "../services/errors.js";
import {PromptInput} from "../types/promptTypes.js";


type ValidatorFn = (body: PromptInput) => void;

export const validateBody = (validator: ValidatorFn) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            validator(req.body);
            next();
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json({error: error.message});
            } else {
                next(error);
            }
        }
    };
};
