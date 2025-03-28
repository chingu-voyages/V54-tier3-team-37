import {Router, Request, Response} from "express";
import {authMiddleware} from "../middleware/index.js";
import {getUserById} from "../controllers/userController.js";
import {mapUserToPublic} from "../types/mapper/userMapper.js";

export const userRoute: Router = Router({});


userRoute.get("/me", authMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;

        const user = await getUserById(userId);

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.status(200).json({ user: mapUserToPublic(user) });
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
});








