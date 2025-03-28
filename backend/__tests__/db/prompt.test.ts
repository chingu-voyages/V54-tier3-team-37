import {PrismaClient} from '@prisma/client';
import {afterAll, beforeAll, describe, expect, it} from '@jest/globals';

const prisma = new PrismaClient();
let testUserId: string;

describe('Prisma Prompt Model', () => {
    beforeAll(async () => {
        const user = await prisma.user.create({
            data: {
                email: `testemail.${Date.now()}@qmail.com`,
                displayName: 'Prompt User',
            },
        });
        testUserId = user.id;
    });

    afterAll(async () => {
        await prisma.prompt.deleteMany({where: {userId: testUserId}});
        await prisma.user.delete({where: {id: testUserId}});
        await prisma.$disconnect();
    });

    it('should create and fetch a prompt for the user', async () => {
        const createdPrompt = await prisma.prompt.create({
            data: {
                userId: testUserId,
                title: 'Sample Prompt',
                persona: 'Engineer',
                context: 'Building tests',
                task: 'Write unit tests for prompt model',
                output: 'A passing test',
                constraints: 'Must include all fields',
            },
        });

        const foundPrompt = await prisma.prompt.findUnique({
            where: {id: createdPrompt.id},
        });

        expect(foundPrompt).not.toBeNull();
        expect(foundPrompt?.title).toBe('Sample Prompt');
        expect(foundPrompt?.userId).toBe(testUserId);
    });

    it('should apply default values for score and isBookmarked', async () => {

        const createdPrompt = await prisma.prompt.create({
            data: {
                userId: testUserId,
                title: 'Sample Prompt',
                persona: 'Engineer',
                context: 'Building tests',
                task: 'Write unit tests for prompt model',
                output: 'A passing test',
                constraints: 'Must include all fields',
            },
        });

        const userId = testUserId;

        const prompt = await prisma.prompt.create({
            data: {
                userId,
                title: 'Defaults Test',
                persona: 'Defaults',
                context: 'Checking defaults',
                task: 'Leave out score and isBookmarked',
                output: 'Check default values',
                constraints: 'None',
            },
        });

        expect(prompt.score).toBe(0);
        expect(prompt.isBookmarked).toBe(false);
    });

    it('should update the title and score of a prompt', async () => {
        const createdPrompt = await prisma.prompt.create({
            data: {
                userId: testUserId,
                title: 'Sample Prompt',
                persona: 'Engineer',
                context: 'Building tests',
                task: 'Write unit tests for prompt model',
                output: 'A passing test',
                constraints: 'Must include all fields',
            },
        });

        const promptId = createdPrompt.id;


        const updatedPrompt = await prisma.prompt.update({
            where: {id: promptId},
            data: {
                title: 'Updated Title',
                score: 10,
            },
        });

        expect(updatedPrompt.title).toBe('Updated Title');
        expect(updatedPrompt.score).toBe(10);
    });


    it('should delete a prompt and confirm it no longer exists', async () => {

        const prompt = await prisma.prompt.create({
            data: {
                userId: testUserId,
                title: 'To Be Deleted',
                persona: 'Cleaner',
                context: 'Delete testing',
                task: 'Test delete',
                output: 'Should be removed',
                constraints: 'None',
            },
        });


        await prisma.prompt.delete({
            where: {id: prompt.id},
        });


        const found = await prisma.prompt.findUnique({
            where: {id: prompt.id},
        });

        expect(found).toBeNull();
    });

    it('should delete prompts when the user is deleted (cascade)', async () => {

        const user = await prisma.user.create({
            data: {
                email: `testemail.${Date.now()}@qmail.com`,
                displayName: 'Cascade User',
            },
        });


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


        await prisma.user.delete({
            where: { id: user.id },
        });


        const remainingPrompts = await prisma.prompt.findMany({
            where: { userId: user.id },
        });

        expect(remainingPrompts.length).toBe(0);
    });


});