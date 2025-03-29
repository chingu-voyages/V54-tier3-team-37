import {afterAll, describe, expect, it} from "@jest/globals";
import {createTestUser, deleteUserByEmail, generateUniqueEmail, prisma} from "../utils/prismaTestUtils";

describe("Prisma User Model", () => {
    let testEmail: string;
    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("should return an array of users (can be empty)", async () => {
        const users = await prisma.user.findMany();
        expect(Array.isArray(users)).toBe(true);
    });

    it("should create, retrieve, and delete a test user", async () => {
        const email = generateUniqueEmail("basic");

        const user = await createTestUser({email});

        const found = await prisma.user.findUnique({where: {id: user.id}});

        expect(found).not.toBeNull();
        expect(found?.email).toBe(email);

        await prisma.user.delete({where: {id: user.id}});
    });

    it('should throw a unique constraint error when using duplicate email', async () => {
        testEmail = generateUniqueEmail('duplicate');

        await createTestUser({ email: testEmail });

        let errorCaught = false;

        try {
            await createTestUser({ email: testEmail });
        } catch (error: any) {
            errorCaught = true;
            expect(error.code).toBe('P2002'); // Prisma's unique constraint error
            expect(error.meta?.target).toContain('email');
        }

        expect(errorCaught).toBe(true);
    });
    it("should find user by email", async () => {
        const email = generateUniqueEmail("find-by-email");

        const user = await createTestUser({email, displayName: "Email Finder"});

        const found = await prisma.user.findUnique({where: {email}});

        expect(found?.id).toBe(user.id);
        expect(found?.displayName).toBe("Email Finder");

        await deleteUserByEmail(email);
    });

    it("should not allow duplicate emails", async () => {
        const email = generateUniqueEmail("dup");

        const user = await createTestUser({email});

        let errorCaught = false;

        try {
            await createTestUser({email});
        } catch (error: any) {
            errorCaught = true;
            expect(error.code).toBe("P2002");
        }

        expect(errorCaught).toBe(true);
        await prisma.user.delete({where: {id: user.id}});
    });

    it("should fetch user with prompts", async () => {
        const email = generateUniqueEmail("prompts");
        const user = await createTestUser({email});

        await prisma.prompt.createMany({
            data: [
                {
                    userId: user.id,
                    title: "Prompt 1",
                    persona: "Dev",
                    context: "Project",
                    task: "Code",
                    output: "Snippet",
                    constraints: "None",
                },
                {
                    userId: user.id,
                    title: "Prompt 2",
                    persona: "Tester",
                    context: "QA",
                    task: "Test",
                    output: "Report",
                    constraints: "5 min",
                },
            ],
        });

        const userWithPrompts = await prisma.user.findUnique({
            where: {id: user.id},
            include: {prompts: true},
        });

        expect(userWithPrompts?.prompts.length).toBe(2);
        expect(userWithPrompts?.prompts.map(p => p.title)).toEqual(["Prompt 1", "Prompt 2"]);

        await prisma.prompt.deleteMany({where: {userId: user.id}});
        await prisma.user.delete({where: {id: user.id}});
    });
});
