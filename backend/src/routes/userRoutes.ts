import {Router, Request, Response} from "express";
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

userRoute.get("/:userId", async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { prompts: true },
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return
        }

        res.status(200).json(user);
        return

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});







