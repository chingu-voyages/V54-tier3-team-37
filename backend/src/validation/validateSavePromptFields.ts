import {validatePromptFields} from "./validatePromptFields.js";
import {ValidationError} from "../services/errors.js";
import {PromptInput} from "../types/promptTypes.js";

export const validateSavePromptFields = (body: PromptInput): void => {

    validatePromptFields(body);

    if (!body.geminiText || !body.geminiSummary) {
        throw new ValidationError("'geminiText' and 'geminiSummary' are required.");
    }

    if (body.score !== undefined && isNaN(Number(body.score))) {
        throw new ValidationError("Score must be a number if provided");
    }
};
