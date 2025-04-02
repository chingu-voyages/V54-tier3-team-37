import prisma from "../prisma.js";
import { CreatePromptInput } from "../types/promptTypes.js";

export const createPromptService = async (userId: string | undefined, data: CreatePromptInput) => {
    const createdPrompt = await prisma.prompt.create({
        data: {
            user: { connect: { id: userId } },
            ...data,
        },
    });

    return createdPrompt;
};


export const getPromptService = async (userId: string, promptId: string) => {
    const prompt = await prisma.prompt.findUnique({
        where: { id: promptId, userId: userId },
    });

    return prompt;
};