import { Language } from "@prisma/client";
import { GeminiResponseType } from "../../src/types/promptTypes";


export const promptInput = {
    role: "Test Role",
    context: "Some context",
    task: "Test task",
    output: "Expected output",
    constraints: "None",
    language: Language.EN,
    score: 0,
    geminiText: null,
    geminiSummary: null,
};

// export const promptData = {
//     role: "Dev",
//     context: "Add login",
//     output: "Login logic",
//     task: "Implement login",
//     constraints: "No third-party",
//     language: Language.EN,
//     score: 3,
//     geminiText: "This is a response from Gemini",
//     geminiSummary: "Short summary",
// };

export const mockGeminiResponse: GeminiResponseType = {
    text: "some long response...",
    summary: "short summary",
};

export const getMockPrompt = (userId: string) => ({
    id: "mock-prompt-id",
    userId,
    role: "Sample Role",
    context: "Sample context",
    task: "Sample task",
    output: "Sample output",
    constraints: "Sample constraints",
    language: Language.EN,
    score: 5,
    geminiText: "Sample text",
    geminiSummary: "Short summary",
    createdAt: new Date().toISOString(),
});
