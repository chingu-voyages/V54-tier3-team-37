import {CreatePromptInput} from "../types/promptTypes.js";
import {Request, Response} from "express";
import {createPromptService, getPromptService, savePromptOutputService} from "../services/promptService.js";
import {generateGeminiResponse} from "../services/geminiService.js";
import {formatPromptForAI} from "../utils/formatPromptForAI.js";


/**
 * Controller to handle prompt creation and AI-generated output.
 *
 * - Validates request body
 * - Creates a new prompt in the database
 * - Formats the prompt for AI
 * - Calls Gemini service to generate AI output
 * - Saves the output and returns it in the response
 *
 * @param req - Express request containing `prompt` in the body and `userId` from auth middleware
 * @param res - Express response
 */
export const createPrompt = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        const {prompt} = req.body;

        if (!prompt) {
            res.status(400).json({error: "Prompt is required"});
            return;
        }

        const {role, context, task, output, constraints, language} = prompt;

        const data: CreatePromptInput = {
            role,
            context,
            task,
            output,
            constraints,
            language
        };

        const createdPrompt =
            await createPromptService(userId, data);

        if (!createdPrompt) {
            res.status(400).json({error: "Prompt creation failed"});
            return;
        }

        const formattedPrompt = formatPromptForAI(data);

        const aiOutput = await generateGeminiResponse(formattedPrompt);

        const savedOutput = await savePromptOutputService({
            userId: userId!,
            promptId: createdPrompt.id,
            content: aiOutput,
            metadata: {
                language,
                model: "gemini-2.0-flash",
                formattedPromptPreview: formattedPrompt.slice(0, 200),
            },
        });

        res.status(201).json({output: savedOutput});

    } catch
        (error) {
        console.error("Prompt creation error:", error);
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

