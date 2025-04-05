import prisma from "../prisma.js";
import {Prisma, Prompt} from "@prisma/client";
import {CreatePromptInput} from "../types/promptTypes.js";
import {SavePromptOutputInput} from "../types/outputTypes.js";


/**
 * Creates a new prompt in the database for the specified user.
 *
 * This service:
 * - Connects the new prompt to the user via `userId`
 * - Saves all provided prompt data using Prisma
 * - Returns the created `Prompt` object
 *
 * @param {string | undefined} userId - The ID of the user creating the prompt
 * @param {CreatePromptInput} data - The prompt details to be saved
 * @returns {Promise<Prompt>} - The newly created prompt record
 */
export const createPromptService = async (userId: string | undefined, data: CreatePromptInput) => {
    const createdPrompt = await prisma.prompt.create({
        data: {
            user: {connect: {id: userId}},
            ...data,
        },
    });

    return createdPrompt;
};

/**
 * Checks if a prompt already exists in the database for a specific user.
 *
 * This service:
 * - Searches for an existing prompt using the provided data
 * - Returns `true` if a duplicate is found, `false` otherwise
 *
 * @param {SavePromptOutputInput} data - The prompt details to check for duplicates
 * @returns {Promise<boolean>} - `true` if a duplicate exists, `false` otherwise
 */
export const checkDuplicatePrompt = async (
    data: SavePromptOutputInput
): Promise<boolean> => {
    const existingPrompt = await prisma.prompt.findFirst({
        where: {
            userId: data.userId,
            role: data.role,
            context: data.context,
            task: data.task,
            output: data.output,
            constraints: data.constraints,
            language: data.language,
        },
    });

    return Boolean(existingPrompt);
};

/**
 * Saves the output of a prompt for a specific user.
 *
 * This service:
 * - Creates a new prompt record in the database
 * - Returns the created `Prompt` object
 *
 * @param {SavePromptOutputInput} data - The prompt output details to be saved
 * @returns {Promise<Prompt>} - The newly created prompt record
 */
export const savePromptService = async (
    data: SavePromptOutputInput
): Promise<Prompt> => {
    try {

        return await prisma.prompt.create({
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
    } catch (error) {
        console.error("Error saving prompt output:", error);
        throw new Error("Failed to save prompt output");
    }
};

/**
 * Updates the score of a specific prompt for a given user.
 *
 * This service:
 * - Updates the score of the prompt using `updateMany` to ensure the prompt belongs to the user
 * - Returns `null` if no prompt was updated (not found or unauthorized)
 * - Retrieves and returns the updated prompt using `findUnique`
 *
 * @param {string} userId - The ID of the user requesting the update
 * @param {string} promptId - The ID of the prompt to be updated
 * @param {number} score - The new score to assign to the prompt
 * @returns {Promise<Prompt | null>} - The updated prompt if found and updated, or `null` if not
 */
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

/**
 * Retrieves a specific prompt by its ID and associated user ID.
 *
 * This service:
 * - Uses Prisma to find a prompt that matches both `promptId` and `userId`
 * - Ensures users can only access their own prompts
 *
 * @param {string} userId - The ID of the user who owns the prompt
 * @param {string} promptId - The ID of the prompt to retrieve
 * @returns {Promise<Prompt | null>} - The found prompt or `null` if not found or not authorized
 */
export const getPromptService = async (userId: string, promptId: string) => {
    const prompt = await prisma.prompt.findUnique({
        where: {id: promptId, userId: userId},
    });

    return prompt;
};

/**
 * Retrieves all prompts associated with a given user.
 *
 * This service:
 * - Constructs query arguments to fetch prompts using Prisma
 * - Filters prompts by the provided `userId` and orders them in descending order by creation date
 * - Returns an array of prompts or throws an error if the operation fails
 *
 * @param {string} userId - The ID of the user whose prompts are to be retrieved
 * @returns {Promise<Prompt[]>} - A promise that resolves to an array of prompts
 * @throws {Error} - Throws an error if the prompts cannot be fetched
 */
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




