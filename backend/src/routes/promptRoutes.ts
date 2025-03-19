import { Router, Request, Response } from "express";
import prisma from "../prisma.js";
import { validate as isUUID } from "uuid";

export const promptRoute: Router = Router({});

interface PromptRequestBody {
    title: string;
    persona: string;
    context: string;
    task: string;
    output: string;
    constraints: string;
    score?: number;
    isBookmarked?: boolean;
}

promptRoute.get("/:promptId", async (req: Request<{ promptId: string }>, res: Response) => {
    try {
        const { promptId } = req.params;

        if (!isUUID(promptId)) {
            res.status(400).json({ error: "Invalid UUID format for promptId" });
            return;
        }

        const prompt = await prisma.prompt.findUnique({
            where: { id: promptId },
            include: { user: true }
        });

        if (!prompt) {
            res.status(404).json({ error: "Prompt not found" });
            return;
        }

        res.status(200).json(prompt);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});


promptRoute.post("/:userId", async (req: Request<{ userId: string }, {}, PromptRequestBody>, res: Response) => {
    try {
        const { userId } = req.params;
        const { title, persona, context, task, output, constraints, score, isBookmarked } = req.body;

        if (!isUUID(userId)) {
            res.status(400).json({ error: "Invalid UUID format for userId" });
            return;
        }

        const userExists = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!userExists) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const newPrompt = await prisma.prompt.create({
            data: {
                title,
                persona,
                context,
                task,
                output,
                constraints,
                score: score ?? 0,
                isBookmarked: isBookmarked ?? false,
                user: { connect: { id: userId } },
            },
        });

        res.status(201).json(newPrompt);
        return;

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
