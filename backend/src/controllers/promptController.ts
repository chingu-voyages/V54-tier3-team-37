import {
    checkDuplicatePrompt,
    deleteAllPromptsService,
    deletePromptService,
    getAllPromptsService,
    getPromptService,
    savePromptService,
    updatePromptScoreService
} from "../services/promptService.js";
import {Request, Response} from "express";
import {generateGeminiResponse} from "../services/geminiService.js";
import {SavePromptOutputInput} from "../types/outputTypes.js";
import {Language} from "@prisma/client";
import {DuplicatePromptError, UnauthorizedError} from "../services/errors.js";
import {PromptInput} from "../types/promptTypes.js";


export const generatePrompt = async (req: Request<unknown, unknown, PromptInput>, res: Response): Promise<void> => {

    try {
        const userId = req.userId;

        if (!userId) throw new UnauthorizedError();

        const {
            role,
            context,
            task,
            output,
            constraints,
            language,
            score = 0
        } = req.body;


        const promptText = [
            `You are a ${role}.`,
            `Context: ${context}`,
            `Task: ${task}`,
            `Expected Output: ${output}`,
            `Constraints: ${constraints}`,
            `Language: ${language}`
        ].join('\n');

        const aiResponse = await generateGeminiResponse(promptText);

        res.status(200).json({
            role,
            context,
            task,
            output,
            constraints,
            language,
            score,
            geminiText: aiResponse.text,
            geminiSummary: aiResponse.summary,
        });

    } catch
        (error) {
        console.error("[PromptController] generatePrompt error:", error);
        if (error instanceof UnauthorizedError) {
            res.status(401).json({error: error.message});
        } else {
            res.status(500).json({error: "Something went wrong"});
        }
    }
};


export const savePrompt = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;

        if (!userId) throw new UnauthorizedError();

        const {
            role,
            context,
            task,
            output,
            constraints,
            language,
            score,
            geminiText,
            geminiSummary
        } = req.body;


        const input: SavePromptOutputInput = {
            userId,
            role: String(role),
            context: String(context),
            task: String(task),
            output: String(output),
            constraints: String(constraints),
            language: language as Language,
            score: Number(score),
            geminiText: String(geminiText),
            geminiSummary: String(geminiSummary),
        };

        const isDuplicate: boolean = await checkDuplicatePrompt(input);

        if (isDuplicate) throw new DuplicatePromptError();

        const createdPrompt = await savePromptService(input);

        res.status(200).json(createdPrompt);

    } catch (error) {
        console.error("[PromptController] savePrompt error:", error);
        if (error instanceof UnauthorizedError) {
            res.status(401).json({error: error.message});
        } else if (error instanceof DuplicatePromptError) {
            res.status(409).json({error: error.message});
        } else {
            res.status(500).json({error: "Something went wrong"});
        }
    }
};

/**
 * Retrieves a specific prompt by its ID for the authenticated user.
 *
 * This controller:
 * - Validates that both `userId` and `promptId` are present
 * - Calls the `getPromptService` to retrieve the prompt from the database
 * - Returns the prompt if found, otherwise sends a 404 response
 *
 * @param {Request} req - Express request object containing `userId` and `promptId` as a route param
 * @param {Response} res - Express response object used to return the prompt or an error
 * @returns {void}
 *
 * @response 200 - The requested prompt wrapped in a `prompt` field
 * @response 400 - If `userId` or `promptId` is missing
 * @response 404 - If the prompt was not found for the given user
 * @response 500 - If a server-side error occurs during the operation
 */
export const getPrompt = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        const promptId = req.params.promptId;

        if (!userId || !promptId) {
            res.status(400).json({message: "Missing userId or promptId"});
            return;
        }

        const prompt = await getPromptService(userId, promptId);

        if (!prompt) {
            res.status(404).json({message: "Prompt not found"});
            return;
        }

        res.status(200).json(prompt);
    } catch (error) {
        console.error("Error in getPrompt controller:", error);
        res.status(500).json({message: "Internal server error"});
    }
};

/**
 * Retrieves all prompts created by the authenticated user.
 *
 * This controller:
 * - Verifies the user is authenticated via `req.userId`
 * - Calls `getAllPromptsService` to fetch all prompts associated with the user
 * - Returns an array of `Prompt` objects
 *
 * @param {Request} req - Express request object containing `userId`
 * @param {Response} res - Express response object used to return the result or error
 * @returns {void}
 *
 * @response 200 - Array of prompts belonging to the authenticated user
 * @response 401 - If the user is not authenticated
 * @response 500 - If a server-side error occurs while fetching prompts
 */
export const getAllPrompts = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({error: "Unauthorized"});
            return;
        }

        const prompts = await getAllPromptsService(userId);

        res.status(200).json(prompts);
    } catch (error) {
        console.error("Error fetching prompts:", error);
        res.status(500).json({error: "Something went wrong"});
    }
};

/**
 * Updates the score of a specific prompt for the authenticated user.
 *
 * This controller:
 * - Validates the presence of `userId`, `promptId`, and a numeric `score`
 * - Calls `updatePromptScoreService` to update the score in the database
 * - Returns the updated `Prompt` if successful
 *
 * @param {Request} req - Express request object containing `userId`, `promptId` as a route param, and `score` in the body
 * @param {Response} res - Express response object used to return the updated prompt or an error
 * @returns {void}
 *
 * @response 200 - The updated prompt with the new score
 * @response 400 - If `score`, `userId`, or `promptId` is missing or invalid
 * @response 404 - If the prompt does not exist or the user is not authorized
 * @response 500 - If a server-side error occurs during the update
 */

export const updateScorePrompt = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;

        const promptId = req.params.promptId;
        const {score} = req.body;

        if (!userId || !promptId || typeof score !== "number") {
            res.status(400).json({error: "Missing or invalid score"});
            return;
        }
        const updatedPrompt = await updatePromptScoreService(userId, promptId, score);

        if (!updatedPrompt) {
            res.status(404).json({error: "Prompt not found or not authorized"});
            return;
        }

        res.status(200).json(updatedPrompt);
    } catch (error) {
        console.error("Error updating prompt:", error);
        res.status(500).json({error: "Something went wrong"});
    }
};

/**
 * Controller to delete a specific prompt by ID for the authenticated user.
 *
 * - Requires `userId` from auth middleware and `promptId` from route params
 * - Returns 400 if required values are missing
 * - Returns 404 if no matching prompt is found or user is not authorized
 * - Returns 204 if deletion is successful
 * - Returns 500 on unexpected errors
 *
 * @param req - Express request with `userId` and `promptId`
 * @param res - Express response
 */
export const deletePrompt = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        const promptId = req.params.promptId;

        if (!promptId || !userId) {
            res.status(400).json({error: "Missing userId or promptId"});
            return;
        }

        const result = await deletePromptService(userId, promptId);

        if (result.deletedCount === 0) {
            res.status(404).json({error: "Prompt not found or not authorized"});
            return;
        }

        res.status(204).send();
    } catch (error) {
        console.error("Prompt deletion error:", error);
        res.status(500).json({error: "Something went wrong"});
    }
};

/**
 * Controller to delete all prompts for the authenticated user.
 *
 * - Requires `userId` from auth middleware
 * - Returns 400 if `userId` is missing
 * - Returns 204 on successful deletion
 * - Returns 500 on unexpected errors
 *
 * @param req - Express request with `userId`
 * @param res - Express response
 */
export const deleteAllPrompts = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(400).json({error: "Missing userId"});
            return;
        }

        await deleteAllPromptsService(userId);

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting all prompts:", error);
        res.status(500).json({error: "Something went wrong"});
    }
};


