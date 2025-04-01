import {CreatePromptInput} from "../types/promptTypes.js";

/**
 * Formats a structured prompt object into a plain text string for AI input.
 *
 * This is used to convert the structured data provided by the user
 * (role, context, task, etc.) into a readable format for LLMs like Gemini.
 *
 * @param data - The prompt fields input by the user
 * @returns A single formatted string suitable for sending to an AI model
 */
export const formatPromptForAI = (data: CreatePromptInput): string => {
    return `
    Role: ${data.role}
    Context:
    ${data.context}
    Task:
    ${data.task}
    Expected Output:
    ${data.output}
    Constraints:
    ${data.constraints}
    Please provide your answer in: ${data.language}.
    `.trim();
};