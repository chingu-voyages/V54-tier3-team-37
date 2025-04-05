// import {beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
// import request from "supertest";
// import {
//     createPromptService,
//     deleteAllPromptsService,
//     deletePromptService,
//     getAllPromptsService,
//     getPromptService,
//     savePromptService,
//     updatePromptScoreService,
// } from "../../src/services/promptService";
// import express from "express";
// import {getSignedTestJWT, JWT_SECRET} from "../../__mocks__/getSignedTestJWT";
// import {createMockUser, MockUser} from "../../__mocks__/mockUsersRoute";
// import cookieParser from "cookie-parser";
// import {promptRoute} from "../../src/routes";
// import {findUserById} from "../../src/controllers";
// import {getUserById} from "../../src/controllers/userController";
// import {Language, Prompt} from "@prisma/client";
// import {generateGeminiResponse} from "../../src/services/geminiService";
// import {GeminiResponseType} from "../../src/types/promptTypes";
//
//
// jest.mock("../../src/services/promptService", () => ({
//     createPromptService: jest.fn(),
//     updatePromptScoreService: jest.fn(),
//     savePromptService: jest.fn(),
//     deletePromptService: jest.fn(),
//     deleteAllPromptsService: jest.fn(),
//     getPromptService: jest.fn(),
//     getAllPromptsService: jest.fn(),
// }));
//
// jest.mock("../../src/services/geminiService", () => ({
//     generateGeminiResponse: jest.fn(),
// }));
//
// jest.mock("../../src/controllers/findOrCreateUser", () => ({
//     findUserById: jest.fn(),
// }));
//
// jest.mock("../../src/controllers/userController", () => ({
//     getUserById: jest.fn(),
//     deleteUserById: jest.fn(),
// }));
//
//
// let app: express.Express;
//
// const promptInput = {
//     role: "Test Role",
//     context: "Some context",
//     task: "Test task",
//     output: "Expected output",
//     constraints: "None",
//     language: Language.EN,
//     "score": 0,
//     "geminiText": null,
//     "geminiSummary": null
// };
//
// const mockGeminiResponse: GeminiResponseType = {
//     text: "some long response...",
//     summary: "short summary",
// };
//
// beforeAll(() => {
//     app = express();
//     app.use(cookieParser());
//     app.use(express.json());
//     app.use("/prompts", promptRoute);
// });
//
// const promptData = {
//     role: "Dev",
//     context: "Add login",
//     output: "Login logic",
//     task: "Implement login",
//     constraints: "No third-party",
//     language: Language.EN,
//     score: 3,
//     geminiText: "This is a response from Gemini",
//     geminiSummary: "Short summary",
// };
//
//
// describe("prompt controller", () => {
//     process.env.JWT_SECRET = JWT_SECRET;
//     let mockUser: MockUser;
//     let token: string;
//     let mockPrompt: Prompt;
//
//
//     beforeEach(() => {
//         jest.clearAllMocks();
//
//         mockUser = createMockUser();
//         token = getSignedTestJWT(mockUser);
//
//         mockPrompt = {
//             id: "mock-prompt-id",
//             userId: mockUser.id,
//             role: "Sample Role",
//             context: "Sample context",
//             task: "Sample task",
//             output: "Sample output",
//             constraints: "Sample constraints",
//             language: Language.EN,
//             score: 5,
//             geminiText: "Sample text",
//             geminiSummary: "Short summary",
//             createdAt: new Date().toISOString(),
//         };
//
//
//         (findUserById as jest.Mock).mockResolvedValue(mockUser);
//         (getUserById as jest.Mock).mockResolvedValue(mockUser);
//
//     });
//
//
//     it("should create a prompt and return 201 with data", async () => {
//         (generateGeminiResponse as jest.Mock).mockResolvedValue(mockGeminiResponse);
//
//         const res = await request(app)
//             .post("/prompts/generate")
//             .set("Cookie", [`token=${token}`])
//             .send( promptInput);
//
//         expect(res.status).toBe(200);
//
//         expect(res.body).toMatchObject({
//             role: promptInput.role,
//             context: promptInput.context,
//             task: promptInput.task,
//             output: promptInput.output,
//             constraints: promptInput.constraints,
//             language: promptInput.language,
//             geminiText: mockGeminiResponse.text,
//             geminiSummary: mockGeminiResponse.summary,
//         });
//
//         expect(generateGeminiResponse).toHaveBeenCalled();
//         expect(createPromptService).not.toHaveBeenCalled();
//     });
//
//     it("should return 400 if prompt is missing from body", async () => {
//         const res = await request(app)
//             .post("/prompts/generate")
//             .set("Cookie", [`token=${token}`])
//             .send({}); // no prompt
//
//         expect(res.status).toBe(400);
//         expect(res.body).toEqual({error: "Prompt is required"});
//
//         expect(generateGeminiResponse).not.toHaveBeenCalled();
//     });
//
//     it("should return 500 if generateGeminiResponse throws an error", async () => {
//         (generateGeminiResponse as jest.MockedFunction<typeof generateGeminiResponse>)
//             .mockRejectedValue(new Error("Gemini failure"));
//
//         const res = await request(app)
//             .post("/prompts/generate")
//             .set("Cookie", [`token=${token}`])
//             .send({prompt: promptInput});
//
//         expect(res.status).toBe(500);
//         expect(res.body).toEqual({error: "Something went wrong"});
//
//         expect(generateGeminiResponse).toHaveBeenCalled();
//     });
//
//     it("should return 200 with empty fields if Gemini returns no text", async () => {
//         (generateGeminiResponse as jest.MockedFunction<typeof generateGeminiResponse>)
//             .mockResolvedValue({text: "", summary: ""});
//
//         const res = await request(app)
//             .post("/prompts/generate")
//             .set("Cookie", [`token=${token}`])
//             .send({prompt: promptInput});
//
//         expect(res.status).toBe(200);
//         expect(res.body.geminiText).toBe("");
//         expect(res.body.geminiSummary).toBe("");
//
//         expect(generateGeminiResponse).toHaveBeenCalled();
//     });
//
//     it("should save the prompt and return 201", async () => {
//         (savePromptService as jest.Mock).mockResolvedValue({
//             ...promptData,
//             userId: mockUser.id,
//             createdAt: new Date().toISOString(),
//         });
//
//         const res = await request(app)
//             .post("/prompts/save")
//             .set("Cookie", [`token=${token}`])
//             .send({prompt: promptData});
//
//         expect(res.status).toBe(200);
//         expect(savePromptService).toHaveBeenCalledWith({
//             ...promptData,
//             userId: mockUser.id,
//         });
//         expect(res.body).toMatchObject({
//             role: "Dev",
//             geminiSummary: "Short summary",
//         });
//     });
//
//     it("should return 400 if prompt is missing", async () => {
//         const res = await request(app)
//             .post("/prompts/save")
//             .set("Cookie", [`token=${token}`])
//             .send({}); // No prompt
//
//         expect(res.status).toBe(400);
//         expect(res.body).toEqual({error: "Prompt is required"});
//         expect(savePromptService as jest.Mock).not.toHaveBeenCalled();
//     });
//
//     it("should return 401 if userId is not present", async () => {
//         const fakeToken = "invalidToken";
//
//         const res = await request(app)
//             .post("/prompts/save")
//             .set("Cookie", [`token=${fakeToken}`])
//             .send({prompt: promptData});
//
//         expect(res.status).toBe(401);
//         expect(res.body).toEqual({
//             error: "Access denied",
//             message: "Token is not verified",
//         });
//         expect(savePromptService as jest.Mock).not.toHaveBeenCalled();
//     });
//
//     it("should return 500 if savePromptService throws an error", async () => {
//         (savePromptService as jest.Mock).mockRejectedValue(new Error("DB failure"));
//
//         const res = await request(app)
//             .post("/prompts/save")
//             .set("Cookie", [`token=${token}`])
//             .send({prompt: promptData});
//
//         expect(res.status).toBe(500);
//         expect(res.body).toEqual({error: "Something went wrong"});
//         expect(savePromptService).toHaveBeenCalled();
//     });
//
//     it("should return 400 for invalid language enum", async () => {
//         const invalidPrompt = {...promptData, language: "RU"}; // Not EN/ES/FR
//
//         const res = await request(app)
//             .post("/prompts/save")
//             .set("Cookie", [`token=${token}`])
//             .send({prompt: invalidPrompt});
//
//         expect(res.status).toBe(400);
//         expect(res.body).toEqual({error: "Invalid language"});
//     });
//
//     it("should return 200 and the prompt for a valid user and promptId", async () => {
//         (getPromptService as jest.Mock).mockResolvedValue(mockPrompt);
//
//         const res = await request(app)
//             .get(`/prompts/${mockPrompt.id}`)
//             .set("Cookie", [`token=${token}`]);
//
//         expect(res.status).toBe(200);
//         expect(res.body.prompt).toMatchObject({
//             id: mockPrompt.id,
//             userId: mockPrompt.userId,
//             role: mockPrompt.role,
//             context: mockPrompt.context,
//             task: mockPrompt.task,
//             output: mockPrompt.output,
//             constraints: mockPrompt.constraints,
//             language: mockPrompt.language,
//             score: mockPrompt.score,
//             geminiText: mockPrompt.geminiText,
//             geminiSummary: mockPrompt.geminiSummary,
//             createdAt: mockPrompt.createdAt,
//         });
//
//         expect(getPromptService).toHaveBeenCalledWith(mockUser.id, mockPrompt.id);
//     });
//
//     it("should return 404 if the prompt does not exist", async () => {
//         (getPromptService as jest.Mock).mockResolvedValue(null);
//
//         const res = await request(app)
//             .get(`/prompts/non-existent-id`)
//             .set("Cookie", [`token=${token}`]);
//
//         expect(res.status).toBe(404);
//         expect(res.body.message).toBe("Prompt not found");
//     });
//
//     // it("should return 404 if the route is incorrect or promptId is missing", async () => {
//     //     const res = await request(app)
//     //         .get("/prompts/") // trailing slash but no ID
//     //         .set("Cookie", [`token=${token}`]);
//     //
//     //     expect(res.status).toBe(404);
//     // });
//
//     it("should return 400 if userId or promptId is missing", async () => {
//         const res = await request(app)
//             .get(`/prompts/${mockPrompt.id}`)
//             // no cookie = no userId from middleware
//             .send();
//
//         expect(res.status).toBe(401);
//         expect(res.body.message).toBe("Token not provided");
//     });
//
//     it("should return 401 if no token is provided", async () => {
//         const res = await request(app)
//             .get(`/prompts/${mockPrompt.id}`)
//             .send();
//
//         expect(res.status).toBe(401);
//         expect(res.body.message).toBe("Token not provided");
//     });
//
//     it("should return 401 for an invalid token", async () => {
//         const res = await request(app)
//             .get(`/prompts/${mockPrompt.id}`)
//             .set("Cookie", [`token=invalid-token`]);
//
//         expect(res.status).toBe(401);
//         expect(res.body.message).toBe("Token is not verified");
//     });
//
//     it("should return all prompts for the authenticated user", async () => {
//         const mockPrompts: Prompt[] = [
//             {
//                 id: "p1",
//                 userId: mockUser.id,
//                 role: "Dev",
//                 context: "C1",
//                 task: "T1",
//                 output: "O1",
//                 constraints: "None",
//                 language: Language.EN,
//                 score: 4,
//                 geminiText: "GText",
//                 geminiSummary: "GSummary",
//                 createdAt: new Date().toISOString(),
//             },
//             {
//                 id: "p2",
//                 userId: mockUser.id,
//                 role: "Manager",
//                 context: "C2",
//                 task: "T2",
//                 output: "O2",
//                 constraints: "None",
//                 language: Language.EN,
//                 score: 2,
//                 geminiText: "GText2",
//                 geminiSummary: "GSummary2",
//                 createdAt: new Date().toISOString(),
//             },
//         ];
//
//         (getAllPromptsService as jest.Mock).mockResolvedValue(mockPrompts);
//
//         const res = await request(app)
//             .get("/prompts")
//             .set("Cookie", [`token=${token}`]);
//
//         expect(res.status).toBe(200);
//         expect(Array.isArray(res.body)).toBe(true);
//         expect(res.body).toHaveLength(2);
//         expect(getAllPromptsService).toHaveBeenCalledWith(mockUser.id);
//         expect(res.body[0]).toHaveProperty("id", "p1");
//     });
//
//     it("should return an empty array if user has no prompts", async () => {
//         (getAllPromptsService as jest.Mock).mockResolvedValue([]);
//
//         const res = await request(app)
//             .get("/prompts")
//             .set("Cookie", [`token=${token}`]);
//
//         expect(res.status).toBe(200);
//         expect(Array.isArray(res.body)).toBe(true);
//         expect(res.body).toHaveLength(0);
//     });
//
//     it("should return 401 if no token is provided", async () => {
//         const res = await request(app).get("/prompts");
//
//         expect(res.status).toBe(401);
//         expect(res.body.message).toBe("Token not provided");
//     });
//
//     it("should return 401 if token is invalid", async () => {
//         const res = await request(app)
//             .get("/prompts")
//             .set("Cookie", [`token=invalid-token`]);
//
//         expect(res.status).toBe(401);
//         expect(res.body.message).toBe("Token is not verified");
//     });
//
//     it("should return 500 if getPromptService throws", async () => {
//         (getAllPromptsService as jest.Mock).mockRejectedValue(new Error("DB error"));
//
//         const res = await request(app)
//             .get("/prompts")
//             .set("Cookie", [`token=${token}`]);
//
//         expect(res.status).toBe(500);
//         expect(res.body.error).toBe("Something went wrong");
//     });
//
//
//     it("should update only the score and return the updated prompt", async () => {
//         const newScore = 5;
//
//         const updatedPrompt = {
//             id: mockPrompt.id,
//             userId: mockUser.id,
//             role: "Dev",
//             context: "Update score",
//             task: "Patch request",
//             output: "Updated prompt with new score",
//             constraints: "None",
//             language: Language.EN,
//             score: newScore,
//             geminiText: "Gemini generated text",
//             geminiSummary: "Short summary",
//             createdAt: new Date().toISOString(),
//         };
//
//         (updatePromptScoreService as jest.Mock).mockResolvedValue(updatedPrompt);
//
//         const res = await request(app)
//             .put(`/prompts/${updatedPrompt.id}`)
//             .set("Cookie", [`token=${token}`])
//             .send({score: newScore});
//
//         expect(res.status).toBe(200);
//         expect(res.body).toMatchObject({
//             id: updatedPrompt.id,
//             userId: mockUser.id,
//             score: newScore,
//         });
//
//         expect(res.body).toHaveProperty("createdAt");
//         expect(res.body).toHaveProperty("role");
//         expect(res.body).toHaveProperty("geminiText");
//     });
//
//     it("should return 400 if score is missing", async () => {
//         const res = await request(app)
//             .put(`/prompts/mock-id`)
//             .set("Cookie", [`token=${token}`])
//             .send({});
//
//         expect(res.status).toBe(400);
//         expect(res.body).toEqual({error: "Missing or invalid score"});
//     });
//
//     it("should return 400 if score is not a number", async () => {
//         const res = await request(app)
//             .put(`/prompts/mock-id`)
//             .set("Cookie", [`token=${token}`])
//             .send({score: "invalid"});
//
//         expect(res.status).toBe(400);
//         expect(res.body).toEqual({error: "Missing or invalid score"});
//     });
//
//     it("should return 401 if no token is provided", async () => {
//         const res = await request(app)
//             .put(`/prompts/mock-id`)
//             .send({score: 3});
//
//         expect(res.status).toBe(401);
//         expect(res.body.message).toBe("Token not provided");
//     });
//
//     it("should return 404 if prompt not found", async () => {
//         (updatePromptScoreService as jest.Mock).mockResolvedValue(null);
//
//         const res = await request(app)
//             .put("/prompts/nonexistent-id")
//             .set("Cookie", [`token=${token}`])
//             .send({score: 4});
//
//         expect(res.status).toBe(404);
//         expect(res.body).toEqual({error: "Prompt not found or not authorized"});
//     });
//
//     it("should return 500 if service throws an error", async () => {
//         (updatePromptScoreService as jest.Mock).mockRejectedValue(new Error("DB error"));
//
//         const res = await request(app)
//             .put("/prompts/mock-id")
//             .set("Cookie", [`token=${token}`])
//             .send({score: 4});
//
//         expect(res.status).toBe(500);
//         expect(res.body).toEqual({error: "Something went wrong"});
//     });
//
//     it("should return 204 when the prompt is successfully deleted", async () => {
//         (deletePromptService as jest.Mock).mockResolvedValue({count: 1});
//
//         const res = await request(app)
//             .delete(`/prompts/${mockPrompt.id}`)
//             .set("Cookie", [`token=${token}`]);
//
//         expect(res.status).toBe(204);
//         expect(deletePromptService).toHaveBeenCalledWith(mockUser.id, mockPrompt.id);
//     });
//
//     it("should return 404 if the prompt does not exist or does not belong to the user", async () => {
//         (deletePromptService as jest.Mock).mockResolvedValue({deletedCount: 0});
//
//         const res = await request(app)
//             .delete(`/prompts/nonexistent-id`)
//             .set("Cookie", [`token=${token}`]);
//
//         expect(res.status).toBe(404);
//         expect(res.body.error).toBe("Prompt not found or not authorized");
//     });
//
//     it("should return 401 if no token is provided", async () => {
//         const res = await request(app)
//             .delete(`/prompts/${mockPrompt.id}`);
//
//         expect(res.status).toBe(401);
//         expect(res.body.message).toBe("Token not provided");
//     });
//
//     it("should return 401 for an invalid token", async () => {
//         const res = await request(app)
//             .delete(`/prompts/${mockPrompt.id}`)
//             .set("Cookie", [`token=invalid-token`]);
//
//         expect(res.status).toBe(401);
//         expect(res.body.message).toBe("Token is not verified");
//     });
//     it("should return 500 if deletePromptService throws an error", async () => {
//         (deletePromptService as jest.Mock).mockRejectedValue(new Error("DB error"));
//
//         const res = await request(app)
//             .delete(`/prompts/${mockPrompt.id}`)
//             .set("Cookie", [`token=${token}`]);
//
//         expect(res.status).toBe(500);
//         expect(res.body.error).toBe("Something went wrong");
//     });
//
//     it("should return 204 when all prompts are successfully deleted", async () => {
//         (deleteAllPromptsService as jest.Mock).mockResolvedValue({count: 5});
//
//         const res = await request(app)
//             .delete("/prompts")
//             .set("Cookie", [`token=${token}`]);
//
//         expect(res.status).toBe(204);
//         expect(deleteAllPromptsService).toHaveBeenCalledWith(mockUser.id);
//     });
//
//     it("should return 401 if no token is provided", async () => {
//         const res = await request(app)
//             .delete("/prompts");
//
//         expect(res.status).toBe(401);
//         expect(res.body.message).toBe("Token not provided");
//     });
//
//     it("should return 401 if the token is invalid", async () => {
//         const res = await request(app)
//             .delete("/prompts")
//             .set("Cookie", [`token=invalid-token`]);
//
//         expect(res.status).toBe(401);
//         expect(res.body.message).toBe("Token is not verified");
//     });
//
//     it("should return 500 if deleteAllPromptsService throws an error", async () => {
//         (deleteAllPromptsService as jest.Mock).mockRejectedValue(new Error("DB error"));
//
//         const res = await request(app)
//             .delete("/prompts")
//             .set("Cookie", [`token=${token}`]);
//
//         expect(res.status).toBe(500);
//         expect(res.body.error).toBe("Something went wrong");
//     });
//
//
// });