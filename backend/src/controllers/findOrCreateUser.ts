import prisma from "../prisma.ts";
import { User } from "../types/userTypes.ts";

export const findOrCreateUserId = async (user: User): Promise<string> => {
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

export const findUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user) return user;
};
