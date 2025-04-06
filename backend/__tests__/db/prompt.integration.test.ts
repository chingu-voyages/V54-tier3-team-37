import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { prisma } from "../../__mocks__/prismaTestUtils";
import {
  createTestUser,
  createTestPrompt,
  deleteTestUser,
} from "../../__mocks__/prismaTestUtils";

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
    await prisma.prompt.deleteMany();
    await deleteTestUser(userId);
    await prisma.$disconnect();
  });

  it("should create and retrieve a prompt", async () => {
    const created = await prisma.prompt.create({
      data: {
        userId,
        role: "student",
        context: "Explain the solar system",
        output: "The solar system consists of the sun and planets...",
        task: "Educational content generation",
        constraints: "Short summary under 100 words",
        language: "EN",
        score: 5,
        geminiText: "Gemini generated detailed explanation",
        geminiSummary: "Summary from Gemini",
      },
    });

    promptId = created.id;

    const found = await prisma.prompt.findUnique({
      where: { id: created.id },
    });

    expect(found).not.toBeNull();
    expect(found?.role).toBe("student");
    expect(found?.language).toBe("EN");
    expect(found?.score).toBe(5);
    expect(found?.geminiText).toContain("Gemini");
  });


  it("should update the score and geminiSummary", async () => {
    const updated = await prisma.prompt.update({
      where: { id: promptId },
      data: {
        score: 8,
        geminiSummary: "Updated Gemini summary",
      },
    });

    expect(updated.score).toBe(8);
    expect(updated.geminiSummary).toBe("Updated Gemini summary");
  });

  it("should delete a prompt", async () => {
    const created = await prisma.prompt.create({
      data: {
        userId,
        role: "tester",
        context: "Delete me",
        output: "This is temporary",
        task: "Testing deletion",
        constraints: "None",
        language: "EN",
      },
    });

    await prisma.prompt.delete({
      where: { id: created.id },
    });

    const found = await prisma.prompt.findUnique({
      where: { id: created.id },
    });

    expect(found).toBeNull();
  });

  it("should cascade delete prompts when user is deleted", async () => {
    const tempUser = await createTestUser();
    const tempUserId = tempUser.id;

    await prisma.prompt.createMany({
      data: [
        {
          userId: tempUserId,
          role: "cascade1",
          context: "Cascade context 1",
          output: "Cascade output 1",
          task: "Cascade test 1",
          constraints: "None",
          language: "EN",
        },
        {
          userId: tempUserId,
          role: "cascade2",
          context: "Cascade context 2",
          output: "Cascade output 2",
          task: "Cascade test 2",
          constraints: "None",
          language: "EN",
        },
      ],
    });

    await deleteTestUser(tempUserId);

    const prompts = await prisma.prompt.findMany({
      where: { userId: tempUserId },
    });

    expect(prompts.length).toBe(0);
  });
});