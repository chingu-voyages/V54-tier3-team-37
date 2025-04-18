
import { User } from "@prisma/client";
import prisma from "../prisma.js";

export const getUserById = async (id: string | undefined): Promise<User | null> => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        return user;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw new Error("Failed to retrieve user");
    }
};


export const deleteUserById = async (id: string | undefined): Promise<User | null> => {
    try {
        if (!id) return null;

        const deletedUser = await prisma.user.delete({
            where: { id },
        });

        return deletedUser;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw new Error("Failed to retrieve user");
    }
};