import { PrismaClient, User } from '@prisma/client';

export const prisma = new PrismaClient();

export const generateUniqueEmail = (prefix = 'test') =>
    `${prefix}.${Date.now()}@qmail.com`;

export const createTestUser = async (overrides: Partial<User> = {}) => {
    const email = overrides.email ?? generateUniqueEmail('user');
    const displayName = overrides.displayName ?? 'Test User';

    return await prisma.user.create({
        data: {
            email,
            displayName,
        },
    });
};

export const createTestPrompt = async (userId: string, overrides: Partial<{ title: string }> = {}) => {
    return prisma.prompt.create({
        data: {
            userId,
            title: overrides.title || 'Test Prompt',
            persona: 'Tester',
            context: 'Testing environment',
            task: 'Write automated tests',
            output: 'Some output',
            constraints: 'None',
            ...overrides,
        },
    });
};

export const deleteUserByEmail = async (email: string) => {
    await prisma.user.deleteMany({ where: { email } });
};

export const deleteTestUser = (id: string) => prisma.user.delete({ where: { id } });