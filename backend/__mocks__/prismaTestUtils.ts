import { PrismaClient, Prisma, User } from "@prisma/client";

export const prisma = new PrismaClient();

export const generateUniqueEmail = (prefix = "test") =>
  `${prefix}.${Date.now()}@qmail.com`;

export const createTestUser = async (overrides: Partial<User> = {}) => {
  const email = overrides.email ?? generateUniqueEmail("user");
  const displayName = overrides.displayName ?? "Test User";

  return await prisma.user.create({
    data: {
      email,
      displayName,
    },
  });
};

export const createTestPrompt = async (
  userId: string,
  overrides: Partial<Omit<Prisma.PromptCreateInput, "user">> = {}
) => {
  return prisma.prompt.create({
    data: {
      user: { connect: { id: userId } },
      role: "Test Role",
      context: "Test context",
      task: "Test task",
      output: "Test output",
      constraints: "None",
      language: "EN",
      ...overrides,
    },
  });
};

export const deleteUserByEmail = async (email: string) => {
  await prisma.user.deleteMany({ where: { email } });
};

export const deleteTestUser = async (id: string) => {
  return await prisma.user.delete({ where: { id } });
};
