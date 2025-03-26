import {Request, Response} from 'express';
import {PrismaClient, User} from '@prisma/client';
import {mapUserToPublic} from "../types/mappers/userMapper.js";

const prisma = new PrismaClient();

/**
 * GET /users/:userId
 * Retrieves a user profile by user ID.
 * Returns 404 if the user is not found.
 */
export const getUserProfile = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {userId} = req.params;

        const user = await prisma.user.findUnique({
            where: {id: userId},
        });

        if (!user) {
            res.status(404).json({error: "User not found"});
            return;
        }

        const publicUser = mapUserToPublic(user as User);
        res.status(200).json(publicUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Something went wrong"});
    }
};