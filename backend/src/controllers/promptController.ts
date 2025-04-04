import {
    deleteAllPromptsService,
    deletePromptService,
    getPromptService,
    savePromptOutputService,
    updatePromptService
} from "../services/promptService.js";
import {Request, Response} from "express";
import {generateGeminiResponse} from "../services/geminiService.js";
import {formatPromptForAI} from "../utils/formatPromptForAI.js";


export const createPrompt = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        const {prompt} = req.body;

        if (!prompt) {
            res.status(400).json({error: "Prompt is required"});
            return;
        }

        const {role, context, task, output, constraints, language} = prompt;

        const formattedPrompt = formatPromptForAI({
            role,
            context,
            task,
            output,
            constraints,
            language,
        });

        const aiResponse = await generateGeminiResponse(formattedPrompt);

        res.status(200).json({
            role,
            context,
            task,
            output,
            constraints,
            language,
            geminiText: aiResponse.text,
            geminiSummary: aiResponse.summary,
        });

    } catch
        (error) {
        console.error("Prompt creation error:", error);
        res.status(500).json({error: "Something went wrong"});
    }
};

/**
 * Controller to update an existing prompt and generate a new AI output version.
 *
 * Steps:
 * - Validates request input (userId, promptId, prompt)
 * - Calls service to update the prompt in the DB
 * - If found, formats the updated prompt for AI
 * - Sends it to Gemini and stores the new version of the output
 * - Returns the latest saved output in the response
 *
 * @param req - Express request with userId from auth middleware, promptId from URL, and prompt object in body
 * @param res - Express response
 */
export const updatePrompt = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        const promptId = req.params.promptId;
        const {prompt} = req.body;

        if (!userId || !promptId || !prompt) {
            res.status(400).json({error: "Missing required fields"});
            return;
        }

        const updatedPrompt = await updatePromptService(userId, promptId, prompt);

        if (!updatedPrompt) {
            res.status(404).json({error: "Prompt not found or not authorized"});
            return;
        }

        const formatted = formatPromptForAI(prompt);
        const aiOutput = await generateGeminiResponse(formatted);

        const savedOutput = await savePromptOutputService({
            userId,
            promptId,
            content: aiOutput,
            metadata: {
                language: prompt.language,
                model: "gemini-2.0-flash",
                formattedPromptPreview: formatted.slice(0, 200),
            },
        });

        res.status(200).json({output: savedOutput});
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


/**
 * Controller to retrieve a specific prompt by ID for the authenticated user.
 *
 * - Extracts userId from request (set by auth middleware)
 * - Extracts promptId from URL params
 * - Validates presence of userId and promptId
 * - Uses the service to fetch the prompt from the database
 * - Returns the prompt if found
 * - Handles not found and internal errors with appropriate responses
 *
 * @param req - Express request containing `userId` from auth middleware and `promptId` from URL params
 * @param res - Express response
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

        res.status(200).json({prompt});
    } catch (error) {
        console.error("Error in getPrompt controller:", error);
        res.status(500).json({message: "Internal server error"});
    }
};

