import prisma from "../prisma.js";
import {Prisma, Prompt} from "@prisma/client";
import {CreatePromptInput} from "../types/promptTypes.js";
import {SavePromptOutputInput} from "../types/outputTypes.js";


export const createPromptService = async (userId: string | undefined, data: CreatePromptInput) => {
    const createdPrompt = await prisma.prompt.create({
        data: {
            user: {connect: {id: userId}},
            ...data,
        },
    });

    return createdPrompt;
};



export const getPromptService = async (userId: string, promptId: string) => {
    const prompt = await prisma.prompt.findUnique({
        where: {id: promptId, userId: userId},
    });

    return prompt;
};


export const savePromptService = async (
    data: SavePromptOutputInput
): Promise<Prompt> => {
    try {
        const saved = await prisma.prompt.create({
            data: {
                userId: data.userId,
                role: data.role,
                context: data.context,
                output: data.output,
                task: data.task,
                constraints: data.constraints,
                language: data.language,
                score: data.score,
                geminiText: data.geminiText,
                geminiSummary: data.geminiSummary,
            },
        });

        return saved;
    } catch (error) {
        console.error("Error saving prompt output:", error);
        throw new Error("Failed to save prompt output");
    }
};

export const updatePromptScoreService = async (
    userId: string,
    promptId: string,
    score: number
) => {
    const result = await prisma.prompt.updateMany({
        where: {
            id: promptId,
            userId,
        },
        data: {
            score,
        },
    });

    if (result.count === 0) return null;


    return prisma.prompt.findUnique({
        where: {id: promptId},
    });
};

export const getAllPromptsService = async (userId: string) => {
    try {
        const args: Prisma.PromptFindManyArgs = {
            where: {userId},
            orderBy: {createdAt: "desc"},
        };

        return await prisma.prompt.findMany(args);
    } catch (error) {
        console.error("Error fetching prompts:", error);
        throw new Error("Failed to fetch prompts");
    }
};


/**
 * Deletes a specific prompt by its ID and user ID.
 *
 * Ensures that the prompt belongs to the user before deletion.
 * Returns an object with a `count` property indicating how many records were deleted (0 or 1).
 *
 * @param userId - The ID of the user attempting to delete the prompt
 * @param promptId - The ID of the prompt to delete
 * @returns {Promise<{ count: number }>} Result of the deletion
 */
export const deletePromptService = async (userId: string, promptId: string) => {
    const result = await prisma.prompt.deleteMany({
        where: {id: promptId, userId},
    });

    return {deletedCount: result.count};
};

/**
 * Deletes all prompts associated with a specific user.
 *
 * Used for scenarios like account cleanup or bulk deletion.
 * Returns an object with a `count` property indicating how many records were deleted.
 *
 * @param userId - The ID of the user whose prompts should be deleted
 * @returns {Promise<{ count: number }>} Result of the deletion
 */
export const deleteAllPromptsService = async (userId: string) => {
    return prisma.prompt.deleteMany({
        where: {userId},
    });
};




