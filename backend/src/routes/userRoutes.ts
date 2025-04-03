import {Request, Response, Router} from "express";
import {authMiddleware} from "../middleware/index.js";
import {deleteUserById, getUserById} from "../controllers/userController.js";
import {mapUserToPublic} from "../types/mapper/userMapper.js";

export const userRoute: Router = Router({});

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current authenticated user's profile
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User profile successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     displayName:
 *                       type: string
 *                     imageUrl:
 *                       type: string
 *                       nullable: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized - Token not provided or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRoute.get("/me", authMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;

        const user = await getUserById(userId);

        if (!user) {
            res.status(404).json({error: "User not found"});
            return;
        }

        res.status(200).json({user: mapUserToPublic(user)});
    } catch (_error) {
        res.status(500).json({error: "Internal server error"});
    }
});



/**
 * @swagger
 * /users/me:
 *   delete:
 *     summary: Delete the currently authenticated user
 *     description: Deletes the authenticated user account.
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       204:
 *         description: User successfully deleted
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
userRoute.delete("/me", authMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;

        const user = await getUserById(userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        await deleteUserById(userId);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});








