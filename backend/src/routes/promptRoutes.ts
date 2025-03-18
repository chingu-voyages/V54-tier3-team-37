import { Router } from "express";
// import prisma from "../prisma.js";
// import { validate as isUUID } from "uuid";

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

// promptRoute.post("/:userId", async (req: Request<{ userId: string }, {}, PromptRequestBody>, res: Response) => {
//     try {
//         const { userId } = req.params;
//         const { title, persona, context, task, output, constraints, score, isBookmarked } = req.body;
//
//         if (!isUUID(userId)) {
//             return res.status(400).json({ error: "Invalid UUID format for userId" });
//         }
//
//         const userExists = await prisma.user.findUnique({
//             where: { id: userId }
//         });
//
//         if (!userExists) {
//             return res.status(404).json({ error: "User not found" });
//         }
//
//         const newPrompt = await prisma.prompt.create({
//             data: {
//                 title,
//                 persona,
//                 context,
//                 task,
//                 output,
//                 constraints,
//                 score: score ?? 0,
//                 isBookmarked: isBookmarked ?? false,
//                 user: { connect: { id: userId } },
//             },
//         });
//
//         res.status(201).json(newPrompt);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Something went wrong" });
//     }
// });
