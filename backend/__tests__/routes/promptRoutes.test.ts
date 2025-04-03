import {beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import request from "supertest";
import {createPromptService, savePromptOutputService, updatePromptService} from "../../src/services/promptService";
import express from "express";
import {getSignedTestJWT, JWT_SECRET} from "../../__mocks__/getSignedTestJWT";
import {createMockUser, MockUser} from "../../__mocks__/mockUsersRoute";
import cookieParser from "cookie-parser";
import {promptRoute} from "../../src/routes";
import {findUserById} from "../../src/controllers";
import {deleteUserById, getUserById} from "../../src/controllers/userController";
import {Language, Prompt} from "@prisma/client";
import {generateGeminiResponse} from "../../src/services/geminiService";


jest.mock("../../src/services/promptService", () => ({
    createPromptService: jest.fn(),
    updatePromptService: jest.fn(),
    savePromptOutputService: jest.fn(),
}));

jest.mock("../../src/services/geminiService", () => ({
    generateGeminiResponse: jest.fn(),
}));

jest.mock("../../src/controllers/findOrCreateUser", () => ({
    findUserById: jest.fn(),
}));

jest.mock("../../src/controllers/userController", () => ({
    getUserById: jest.fn(),
    deleteUserById: jest.fn(),
}));


let app: express.Express;

const promptInput = {
    role: "Test Role",
    context: "Some context",
    task: "Test task",
    output: "Expected output",
    constraints: "None",
    language: Language.EN,
};

beforeAll(() => {
    app = express();
    app.use(cookieParser());
    app.use(express.json());
    app.use("/prompts", promptRoute);
});


describe("prompt controller", () => {
    process.env.JWT_SECRET = JWT_SECRET;
    let mockUser: MockUser;
    let token: string;
    let mockPrompt: Prompt;


    beforeEach(() => {
        jest.clearAllMocks();

        mockUser = createMockUser();
        token = getSignedTestJWT(mockUser);

        mockPrompt = {
            id: "test-prompt-id",
            userId: mockUser.id,
            role: "Test Role",
            context: "Some context",
            task: "Test task",
            output: "Expected output",
            constraints: "None",
            language: Language.EN,
            createdAt: new Date(),
            score: 0,
            isBookmarked: false,
        };

        const mockFormattedPromptPreview = `
            Role: Frontend Developer
            Context:
            I want to contribute to open source.
            Task:
            Give beginner-friendly GitHub repos.
            Expected Output:
            List of projects
            Constraints:
            Only active repos
            Please provide your answer in: EN.
            `.trim().slice(0, 200);

        const mockOutput = {
            id: "output-id",
            userId: "user-id",
            promptId: "prompt-uuid",
            content: "Here is a list of good repos...",
            metadata: {
                language: Language.EN,
                model: "gemini-2.0-flash",
                formattedPromptPreview: mockFormattedPromptPreview,
            },
            version: 1,
            createdAt: new Date().toISOString(),
        };

        (findUserById as jest.Mock).mockResolvedValue(mockUser);
        (getUserById as jest.Mock).mockResolvedValue(mockUser);
        (deleteUserById as jest.Mock).mockResolvedValue(mockUser);
        (generateGeminiResponse as jest.Mock).mockResolvedValue("AI-generated output");
        (savePromptOutputService as jest.Mock).mockResolvedValue(mockOutput);
    });


    it("should create a prompt and return 201 with data", async () => {
        (createPromptService as jest.Mock).mockResolvedValue(mockPrompt);

        const res = await request(app)
            .post("/prompts")
            .set("Cookie", [`token=${token}`])
            .send({prompt: promptInput});

        expect(res.status).toBe(201);
        expect(res.body.output).toMatchObject({
            id: "output-id",
            content: "Here is a list of good repos...",
            metadata: {language: Language.EN},
        });

        expect(createPromptService).toHaveBeenCalledWith(mockUser.id, promptInput);
        expect(generateGeminiResponse).toHaveBeenCalled();
        expect(savePromptOutputService).toHaveBeenCalled();
    });

    it("should return 400 if prompt is missing in request body", async () => {
        const res = await request(app)
            .post("/prompts")
            .set("Cookie", [`token=${token}`])
            .send({});

        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Prompt is required");
    });

    it("should return 500 if createPromptService throws an error", async () => {
        const originalError = console.error;
        console.error = jest.fn();
        (createPromptService as jest.Mock).mockRejectedValue(new Error("DB error"));


        const res = await request(app)
            .post("/prompts")
            .set("Cookie", [`token=${token}`])
            .send({prompt: promptInput});

        expect(res.status).toBe(500);
        expect(res.body.error).toBe("Something went wrong");
    });

    it("should return 401 if token is missing", async () => {
        const res = await request(app)
            .post("/prompts")
            .send({prompt: {role: "X"}});

        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Token not provided");
    });

    it("should return 401 for invalid token", async () => {
        const res = await request(app)
            .post("/prompts")
            .set("Cookie", [`token=invalid-token`])
            .send({prompt: promptInput});

        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Token is not verified");
    });

    it("should update the prompt and save a new output version", async () => {
        const updatedPrompt = {
            id: mockPrompt.id,
            userId: mockUser.id,
            role: "Updated Role",
            context: "Updated context",
            task: "Updated task",
            output: "Updated output",
            constraints: "Updated constraints",
            language: Language.EN,
        };

        const updatedOutput = {
            id: "output-id-2",
            promptId: mockPrompt.id,
            userId: mockUser.id,
            content: "Updated AI response",
            metadata: {
                language: Language.EN,
                model: "gemini-2.0-flash",
                formattedPromptPreview: "Updated preview...",
            },
            version: 2,
            createdAt: new Date().toISOString(),
        };

        (updatePromptService as jest.Mock).mockResolvedValue(updatedPrompt);
        (savePromptOutputService as jest.Mock).mockResolvedValue(updatedOutput);

        const res = await request(app)
            .put(`/prompts/${mockPrompt.id}`)
            .set("Cookie", [`token=${token}`])
            .send({prompt: updatedPrompt});

        expect(res.status).toBe(200);
        expect(res.body.output).toMatchObject({
            id: "output-id-2",
            content: "Updated AI response",
            version: 2,
        });

        expect(updatePromptService).toHaveBeenCalledWith(mockUser.id, mockPrompt.id, updatedPrompt);
        expect(savePromptOutputService).toHaveBeenCalled();
    });

    it("should return 404 if the prompt does not exist or is not authorized", async () => {
        (updatePromptService as jest.Mock).mockResolvedValue(null);

        const res = await request(app)
            .put(`/prompts/non-existent-id`)
            .set("Cookie", [`token=${token}`])
            .send({prompt: promptInput});

        expect(res.status).toBe(404);
        expect(res.body.error).toBe("Prompt not found or not authorized");
    });

    it("should return 400 if prompt is missing in the request body", async () => {
        const res = await request(app)
            .put(`/prompts/${mockPrompt.id}`)
            .set("Cookie", [`token=${token}`])
            .send({}); // No prompt field

        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Missing required fields");
    });

    it("should return 401 if no auth token is provided", async () => {
        const res = await request(app)
            .put(`/prompts/${mockPrompt.id}`)
            .send({prompt: promptInput});

        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Token not provided");
    });

    it("should return 500 if updatePromptService throws an error", async () => {
        (updatePromptService as jest.Mock).mockRejectedValue(new Error("DB error"));

        const res = await request(app)
            .put(`/prompts/${mockPrompt.id}`)
            .set("Cookie", [`token=${token}`])
            .send({prompt: promptInput});

        expect(res.status).toBe(500);
        expect(res.body.error).toBe("Something went wrong");
    });
});