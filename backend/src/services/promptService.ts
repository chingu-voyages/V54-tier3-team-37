import prisma from "../prisma.js";
import {CreatePromptInput} from "../types/promptTypes.js";
import {SavePromptOutputInput} from "../types/outputTypes.js";
import {PromptOutput} from "@prisma/client";

/**
 * Creates a new prompt in the database and links it to the specified user.
 *
 * @param userId - The ID of the user creating the prompt.
 * @param data - The prompt input data including role, context, task, etc.
 * @returns The created prompt object from the database.
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
 * Saves a new AI-generated output version for a specific prompt and user.
 *
 * - If `version` is not provided, it calculates the next version based on the latest saved output for the prompt.
 * - Associates the output with both the prompt and user.
 * - Automatically stores metadata and versioning info.
 *
 * @param data - The output data to save, including promptId, userId, content, optional metadata, and optional version.
 * @returns The saved PromptOutput record from the database.
 * @throws Will throw an error if saving fails (e.g. DB connection issues).
 */
export const savePromptOutputService = async (
    data: SavePromptOutputInput
): Promise<PromptOutput> => {
    try {
        let version = data.version;

        if (version === undefined) {
            const latest = await prisma.promptOutput.findFirst({
                where: {promptId: data.promptId},
                orderBy: [{version: "desc"}] as const,
            });

            version = latest ? latest.version + 1 : 1;
        }

        const saved = await prisma.promptOutput.create({
            data: {
                userId: data.userId,
                promptId: data.promptId,
                content: data.content,
                metadata: data.metadata || {},
                version,
            },
        });

        return saved;
    } catch (error) {
        console.error("Error saving prompt output:", error);
        throw new Error("Failed to save prompt output");
    }
};

/**
 * Service to update a prompt for a specific user.
 *
 * - Uses `updateMany` to safely attempt an update scoped by both userId and promptId
 * - Returns `null` if no records were updated (prompt not found or not authorized)
 * - Otherwise, returns the updated prompt data (with id included)
 *
 * @param userId - ID of the user who owns the prompt
 * @param promptId - ID of the prompt to update
 * @param data - Updated prompt fields (role, task, etc.)
 * @returns The updated prompt data or `null` if not found
 */
export const updatePromptService = async (
    userId: string,
    promptId: string,
    data: CreatePromptInput
) => {
    const result = await prisma.prompt.updateMany({
        where: {
            id: promptId,
            userId,
        },
        data: {
            role: data.role,
            context: data.context,
            task: data.task,
            output: data.output,
            constraints: data.constraints,
            language: data.language,
            ...(data.score !== undefined && { score: data.score }),
            ...(data.isBookmarked !== undefined && { isBookmarked: data.isBookmarked }),
        },
    });

    if (result.count === 0) return null;

    return {...data, id: promptId};
};



