import {Language} from "@prisma/client";

export interface SavePromptOutputInput {
    userId: string;
    role: string;
    context: string;
    output: string;
    task: string;
    constraints: string;
    language: Language;
    score: number;
    geminiText: string;
    geminiSummary: string;
}