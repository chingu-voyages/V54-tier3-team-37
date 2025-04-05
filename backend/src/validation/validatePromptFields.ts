import {Language} from "@prisma/client";
import {ValidationError} from "../services/errors.js";

export const validatePromptFields = (body: any): void => {
    const requiredFields = ["role", "context", "task", "output", "constraints", "language"];

    for (const field of requiredFields) {
        if (!body[field]) {
            throw new ValidationError(`Field '${field}' is required.`);
        }
    }

    if (!Object.values(Language).includes(body.language)) {
        throw new ValidationError("Invalid language");
    }
};
