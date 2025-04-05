import {validatePromptFields} from "./validatePromptFields.js";
import {ValidationError} from "../services/errors.js";

export const validateSavePromptFields = (body: any): void => {
    validatePromptFields(body); // base check

    validatePromptFields(body);

    if (!body.geminiText || !body.geminiSummary) {
        throw new ValidationError("'geminiText' and 'geminiSummary' are required.");
    }

    if (body.score !== undefined && isNaN(Number(body.score))) {
        throw new ValidationError("Score must be a number if provided");
    }
};
