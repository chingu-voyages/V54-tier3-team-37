import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import { createTestUser, createTestPrompt, prisma, deleteTestUser } from '../utils/prismaTestUtils';

describe('Prisma Prompt Model', () => {
    let userId: string;

    beforeAll(async () => {
        const user = await createTestUser();
        userId = user.id;
    });

    afterAll(async () => {
        await prisma.prompt.deleteMany({ where: { userId } });
        await deleteTestUser(userId);
        await prisma.$disconnect();
    });

    it('should create and fetch a prompt for the user', async () => {
        const createdPrompt = await createTestPrompt(userId, {
            title: 'Sample Prompt',
        });

        const foundPrompt = await prisma.prompt.findUnique({
            where: { id: createdPrompt.id },
        });

        expect(foundPrompt).not.toBeNull();
        expect(foundPrompt?.title).toBe('Sample Prompt');
        expect(foundPrompt?.userId).toBe(userId);
    });

    it('should apply default values for score and isBookmarked', async () => {
        const prompt = await createTestPrompt(userId, {
            title: 'Defaults Test',
        });

        expect(prompt.score).toBe(0);
        expect(prompt.isBookmarked).toBe(false);
    });

    it('should update the title and score of a prompt', async () => {
        const createdPrompt = await createTestPrompt(userId);

        const updatedPrompt = await prisma.prompt.update({
            where: { id: createdPrompt.id },
            data: {
                title: 'Updated Title',
                score: 10,
            },
        });

        expect(updatedPrompt.title).toBe('Updated Title');
        expect(updatedPrompt.score).toBe(10);
    });

    it('should delete a prompt and confirm it no longer exists', async () => {
        const prompt = await createTestPrompt(userId, {
            title: 'To Be Deleted',
        });

        await prisma.prompt.delete({ where: { id: prompt.id } });

        const found = await prisma.prompt.findUnique({
            where: { id: prompt.id },
        });

        expect(found).toBeNull();
    });

    it('should delete prompts when the user is deleted (cascade)', async () => {
        const user = await createTestUser(`cascade-${Date.now()}@qmail.com`);

        await prisma.prompt.createMany({
            data: [
                {
                    userId: user.id,
                    title: 'Cascade Prompt 1',
                    persona: 'Cascade',
                    context: 'User delete',
                    task: 'Delete test 1',
                    output: 'Output 1',
                    constraints: 'None',
                },
                {
                    userId: user.id,
                    title: 'Cascade Prompt 2',
                    persona: 'Cascade',
                    context: 'User delete',
                    task: 'Delete test 2',
                    output: 'Output 2',
                    constraints: 'None',
                },
            ],
        });

        await prisma.user.delete({ where: { id: user.id } });

        const remainingPrompts = await prisma.prompt.findMany({
            where: { userId: user.id },
        });

        expect(remainingPrompts.length).toBe(0);
    });
});
