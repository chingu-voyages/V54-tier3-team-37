import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { prisma } from "../utils/prismaTestUtils";
import { createTestUser, createTestPrompt, deleteTestUser } from "../utils/prismaTestUtils";

describe("PromptOutput model integration tests", () => {
    let userId: string;
    let promptId: string;

    beforeAll(async () => {
        const user = await createTestUser();
        userId = user.id;

        const prompt = await createTestPrompt(userId);
        promptId = prompt.id;
    });

    afterAll(async () => {
        await prisma.promptOutput.deleteMany({ where: { userId } });
        await prisma.prompt.deleteMany({ where: { userId } });
        await deleteTestUser(userId);
        await prisma.$disconnect();
    });

    it("should create and retrieve a prompt output", async () => {
        const content = "This is an AI-generated answer.";
        const created = await prisma.promptOutput.create({
            data: {
                promptId,
                userId,
                content,
                metadata: { source: "Gemini", feedback: "great" },
            },
        });

        const found = await prisma.promptOutput.findUnique({
            where: { id: created.id },
        });

        expect(found).not.toBeNull();
        expect(found?.content).toBe(content);
        expect(found?.version).toBe(1); // default
        expect(found?.metadata).toMatchObject({ source: "Gemini" });
    });

    it("should update content and version", async () => {
        const created = await prisma.promptOutput.create({
            data: {
                promptId,
                userId,
                content: "Original content",
            },
        });

        const updated = await prisma.promptOutput.update({
            where: { id: created.id },
            data: {
                content: "Updated content",
                version: 2,
            },
        });

        expect(updated.content).toBe("Updated content");
        expect(updated.version).toBe(2);
    });

    it("should delete a prompt output", async () => {
        const created = await prisma.promptOutput.create({
            data: {
                promptId,
                userId,
                content: "To be deleted",
            },
        });

        await prisma.promptOutput.delete({
            where: { id: created.id },
        });

        const found = await prisma.promptOutput.findUnique({
            where: { id: created.id },
        });

        expect(found).toBeNull();
    });

    it("should cascade delete prompt outputs when prompt is deleted", async () => {
        const prompt = await createTestPrompt(userId);

        await prisma.promptOutput.createMany({
            data: [
                {
                    promptId: prompt.id,
                    userId,
                    content: "Cascade 1",
                },
                {
                    promptId: prompt.id,
                    userId,
                    content: "Cascade 2",
                },
            ],
        });

        await prisma.prompt.delete({ where: { id: prompt.id } });

        const outputs = await prisma.promptOutput.findMany({
            where: { promptId: prompt.id },
        });

        expect(outputs.length).toBe(0);
    });
});
