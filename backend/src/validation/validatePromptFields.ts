import {Language} from "@prisma/client";
import {ValidationError} from "../services/errors.js";
import {PromptInput} from "../types/promptTypes.js";

export const validatePromptFields = (body: PromptInput): void => {
    const requiredFields:(keyof PromptInput)[]  = ["role", "context", "task", "output", "constraints", "language"];

    for (const field of requiredFields) {
        if (!body[field ]) {
            throw new ValidationError(`Field '${field}' is required.`);
        }
    }

    if (!Object.values(Language).includes(body.language)) {
        throw new ValidationError("Invalid language");
    }
};
