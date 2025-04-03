import {Request, Response} from "express";
import {CreatePromptInput} from "../types/promptTypes.js";
import {createPromptService, savePromptOutputService, updatePromptService} from "../services/promptService.js";
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
