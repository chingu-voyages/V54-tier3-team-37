import {Request, Response} from "express";
import {CreatePromptInput} from "../types/promptTypes.js";
import {createPromptService, getPromptService} from "../services/promptService.js";

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
        res.status(201).json({prompt: createdPrompt});

    } catch (error) {
        console.error("Prompt creation error:", error);
        res.status(500).json({error: "Something went wrong"});
    }
};


export const getPrompt = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        console.log("userId", userId)
        const promptId = req.params.promptId;
        console.log("promptId", promptId)
        if (!promptId) {
            res.status(400).json({error: "Prompt ID is required"});
            return;
        }
        const prompt = await getPromptService(userId, promptId);

        if (!prompt) {
            res.status(404).json({error: "Prompt not found"});
            return;
        }
        res.status(200).json({prompt});

    } catch (error) {
        console.error("Get prompt error:", error);
        res.status(500).json({error: "Something went wrong"});
    }
}
