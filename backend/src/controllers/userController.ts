import {NextFunction, Request, Response} from 'express';
import {mapUserToPublic} from "../types/mappers/userMapper.js";
import prisma from "../prisma.js";
import {User} from "@prisma/client";


/**
 * GET /users/:userId
 * Retrieves a user profile by user ID (email).
 * Returns 404 if the user is not found.
 */
export const getUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {userId} = req.params;

        const user = await prisma.user.findUnique({
            where: {email: userId},
        });

        if (!user) {
            res.status(404).json({message: "User not found"});
            return;
        }

        const publicUser = mapUserToPublic(user as User);
        res.status(200).json(publicUser);
    } catch (error) {
        next(error);
    }
};