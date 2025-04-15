import prisma from "../prisma.js";
import { User } from "@prisma/client";
import { User as UnregisteredUser } from "../types/userTypes.js";


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

export const findOrCreateUserId = async (user: UnregisteredUser): Promise<string> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (existingUser) return existingUser.id;

  // Save user image
  const userImage = user.picture ?? user.avatar_url ?? null;

  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      displayName: user.displayName,
      imageUrl: userImage,
    },
  });
  return newUser.id;
};
