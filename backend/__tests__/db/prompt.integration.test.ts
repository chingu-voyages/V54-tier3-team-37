// import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
// import {
//   createTestPrompt,
//   prisma,
//   deleteTestUser,
//   createTestUser,
// } from "../../__mocks__/prismaTestUtils";
//
// const defaultPromptData = {
//   role: "Test Role",
//   context: "Test context",
//   task: "Test task",
//   output: "Test output",
//   constraints: "None",
//   language: "EN" as const,
// };
//
// describe("Prisma Prompt Model", () => {
//   let userId: string;
//
//   beforeAll(async () => {
//     const user = await createTestUser();
//     userId = user.id;
//   });
//
//   afterAll(async () => {
//     await Promise.all([
//       prisma.prompt.deleteMany({ where: { userId } }),
//       deleteTestUser(userId),
//       prisma.$disconnect(),
//     ]);
//   });
//
//   it("should create and fetch a prompt for the user", async () => {
//     const createdPrompt = await createTestPrompt(userId, {
//       ...defaultPromptData,
//       role: "Sample Role",
//     });
//
//     const foundPrompt = await prisma.prompt.findUnique({
//       where: { id: createdPrompt.id },
//     });
//
//     expect(foundPrompt).not.toBeNull();
//     expect(foundPrompt?.role).toBe("Sample Role");
//     expect(foundPrompt?.userId).toBe(userId);
//   });
//
//   it("should apply default values for score and isBookmarked", async () => {
//     const prompt = await createTestPrompt(userId, {
//       ...defaultPromptData,
//     });
//
//     expect(prompt.score).toBe(0);
//     expect(prompt.isBookmarked).toBe(false);
//   });
//
//   it("should update the role and score of a prompt", async () => {
//     const createdPrompt = await createTestPrompt(userId, {
//       ...defaultPromptData,
//     });
//
//     const updatedPrompt = await prisma.prompt.update({
//       where: { id: createdPrompt.id },
//       data: {
//         role: "Updated Role",
//         score: 4,
//       },
//     });
//
//     expect(updatedPrompt.role).toBe("Updated Role");
//     expect(updatedPrompt.score).toBe(4);
//   });
//
//   it("should delete a prompt and confirm it no longer exists", async () => {
//     const prompt = await createTestPrompt(userId, {
//       ...defaultPromptData,
//       role: "To Be Deleted",
//     });
//
//     await prisma.prompt.delete({ where: { id: prompt.id } });
//
//     const found = await prisma.prompt.findUnique({
//       where: { id: prompt.id },
//     });
//
//     expect(found).toBeNull();
//   });
//
//   it("should delete prompts when the user is deleted (cascade)", async () => {
//     const user = await createTestUser({
//       email: `cascade-${Date.now()}@qmail.com`,
//       displayName: "Cascade Test User",
//     });
//
//     await prisma.prompt.createMany({
//       data: [
//         {
//           userId: user.id,
//           ...defaultPromptData,
//           role: "Cascade Role 1",
//         },
//         {
//           userId: user.id,
//           ...defaultPromptData,
//           role: "Cascade Role 2",
//           language: "FR",
//         },
//       ],
//     });
//
//     await prisma.user.delete({ where: { id: user.id } });
//
//     const remainingPrompts = await prisma.prompt.findMany({
//       where: { userId: user.id },
//     });
//
//     expect(remainingPrompts.length).toBe(0);
//   });
// });
