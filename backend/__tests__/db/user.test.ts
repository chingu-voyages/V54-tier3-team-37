import {PrismaClient} from '@prisma/client';
import {afterAll, describe, expect, it} from "@jest/globals";

const prisma = new PrismaClient();

describe('Prisma DB Connection', () => {
    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('should return an array of users (can be empty)', async () => {
        const users = await prisma.user.findMany();
        expect(Array.isArray(users)).toBe(true);
    });

    it('should create, retrieve, and delete a test user', async () => {
        const testEmail = `testemail.${Date.now()}@qmail.com`;

        await prisma.user.deleteMany({
            where: {email: testEmail},
        });

        const createdUser = await prisma.user.create({
            data: {
                email: testEmail,
                displayName: 'Test User',
            },
        });

        const userId = createdUser.id;

        const foundUser = await prisma.user.findUnique({
            where: {id: createdUser.id},
        });

        expect(foundUser).not.toBeNull();
        expect(foundUser?.email).toBe(testEmail);
        expect(foundUser?.displayName).toBe('Test User');


        await prisma.user.delete({
            where: {id: createdUser.id},
        });
    });

    it('should find a user by ID', async () => {
        const email = `testemail.${Date.now()}@qmail.com`;

        const createdUser = await prisma.user.create({
            data: {
                email,
                displayName: 'FindById User',
            },
        });

        const foundUser = await prisma.user.findUnique({
            where: {id: createdUser.id},
        });

        expect(foundUser).not.toBeNull();
        expect(foundUser?.email).toBe(email);


        await prisma.user.delete({where: {id: createdUser.id}});
    });

    it('should find a user by email', async () => {
        const email = `testemail.${Date.now()}@qmail.com`;

        const createdUser = await prisma.user.create({
            data: {
                email,
                displayName: 'FindByEmail User',
            },
        });

        const foundUser = await prisma.user.findUnique({
            where: {email},
        });

        expect(foundUser).not.toBeNull();
        expect(foundUser?.id).toBe(createdUser.id);
        expect(foundUser?.displayName).toBe('FindByEmail User');

        await prisma.user.delete({where: {id: createdUser.id}});
    });

    it('should fail to create a user with a duplicate email', async () => {
        const email = `testemail.${Date.now()}@qmail.com`;


        const user1 = await prisma.user.create({
            data: {
                email,
                displayName: 'Original User',
            },
        });


        let errorOccurred = false;

        try {
            await prisma.user.create({
                data: {
                    email,
                    displayName: 'Duplicate User',
                },
            });
        } catch (error: any) {
            errorOccurred = true;
            expect(error.code).toBe('P2002');
        }

        expect(errorOccurred).toBe(true);


        await prisma.user.delete({where: {id: user1.id}});
    });

    it('should find a user with related prompts', async () => {
        const email = `testemail.${Date.now()}@qmail.com`;


        const user = await prisma.user.create({
            data: {
                email,
                displayName: 'User With Prompts',
            },
        });


        await prisma.prompt.createMany({
            data: [
                {
                    userId: user.id,
                    title: 'Prompt 1',
                    persona: 'Dev',
                    context: 'Testing',
                    task: 'Write code',
                    output: 'Output 1',
                    constraints: 'None',
                },
                {
                    userId: user.id,
                    title: 'Prompt 2',
                    persona: 'Tester',
                    context: 'Validation',
                    task: 'Write test',
                    output: 'Output 2',
                    constraints: 'Time limit',
                },
            ],
        });


        const userWithPrompts = await prisma.user.findUnique({
            where: {id: user.id},
            include: {prompts: true},
        });

        expect(userWithPrompts).not.toBeNull();
        expect(userWithPrompts?.prompts.length).toBe(2);
        expect(userWithPrompts?.prompts[0].title).toBe('Prompt 1');
        expect(userWithPrompts?.prompts[1].title).toBe('Prompt 2');


        await prisma.prompt.deleteMany({where: {userId: user.id}});
        await prisma.user.delete({where: {id: user.id}});
    });


});
