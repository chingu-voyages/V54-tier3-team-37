import { Router, Request, Response} from "express";
import prisma from "../prisma.js";

export const userRoute: Router = Router({});

userRoute.post("/", async (req, res) => {
    try {
        const { email, displayName } = req.body;
        const newUser = await prisma.user.create({
            data: { email, displayName },
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// userRoute.get("/:userId", async (req: Request, res: Response) => {
//     try {
//         const { userId } = req.params;
//
//         // Validate userId
//         // if (!isUUID(userId)) {
//         //     return res.status(400).json({ error: "Invalid UUID format for userId" });
//         // }
//
//         // Fetch the user and their prompts
//         const user = await prisma.user.findUnique({
//             where: { id: userId },
//             include: { prompts: true }, // Include associated prompts
//         });
//
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }
//
//         res.status(200).json(user);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Something went wrong" });
//     }
// });

