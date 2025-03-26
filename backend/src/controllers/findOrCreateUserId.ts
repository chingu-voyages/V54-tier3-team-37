import prisma from "../prisma.js";
import { UserPayload } from "../types/userTypes.js";

export const findOrCreateUserId = async (
  user: UserPayload
): Promise<string> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: user.email },
  });
  if (existingUser) return existingUser.id;

  // Save user image
  // -- I thought that google would be more popular, so google option is first
  // const userImage = user.picture ?? user.avatar_url ?? null;

  const newUser = await prisma.user.create({
    data: { email: user.email, displayName: user.displayName }, // need to add a field for image
  });
  return newUser.id;
};

export const findUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user) return user;
};
