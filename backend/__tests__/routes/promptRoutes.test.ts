import {beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import request from "supertest";
import {
    createPromptService,
    deleteAllPromptsService,
    deletePromptService,
    savePromptOutputService
} from "../../src/services/promptService";
import {createPromptService, getPromptService, savePromptOutputService} from "../../src/services/promptService";
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
    savePromptOutputService: jest.fn(),
    deletePromptService: jest.fn(),
    deleteAllPromptsService: jest.fn(),
    getPromptService: jest.fn(),
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

    it("should return 204 when the prompt is successfully deleted", async () => {
        (deletePromptService as jest.Mock).mockResolvedValue({count: 1});

        const res = await request(app)
            .delete(`/prompts/${mockPrompt.id}`)
            .set("Cookie", [`token=${token}`]);

        expect(res.status).toBe(204);
        expect(deletePromptService).toHaveBeenCalledWith(mockUser.id, mockPrompt.id);
    });

    it("should return 404 if the prompt does not exist or does not belong to the user", async () => {
        (deletePromptService as jest.Mock).mockResolvedValue({deletedCount: 0});

        const res = await request(app)
            .delete(`/prompts/nonexistent-id`)
            .set("Cookie", [`token=${token}`]);

        expect(res.status).toBe(404);
        expect(res.body.error).toBe("Prompt not found or not authorized");
    });

    it("should return 401 if no token is provided", async () => {
        const res = await request(app)
            .delete(`/prompts/${mockPrompt.id}`);

        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Token not provided");
    });

    it("should return 401 for an invalid token", async () => {
        const res = await request(app)
            .delete(`/prompts/${mockPrompt.id}`)
            .set("Cookie", [`token=invalid-token`]);

        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Token is not verified");
    });
    it("should return 500 if deletePromptService throws an error", async () => {
        (deletePromptService as jest.Mock).mockRejectedValue(new Error("DB error"));

        const res = await request(app)
            .delete(`/prompts/${mockPrompt.id}`)
            .set("Cookie", [`token=${token}`]);

        expect(res.status).toBe(500);
        expect(res.body.error).toBe("Something went wrong");
    });

    it("should return 204 when all prompts are successfully deleted", async () => {
        (deleteAllPromptsService as jest.Mock).mockResolvedValue({count: 5});

        const res = await request(app)
            .delete("/prompts")
            .set("Cookie", [`token=${token}`]);

        expect(res.status).toBe(204);
        expect(deleteAllPromptsService).toHaveBeenCalledWith(mockUser.id);
    });

    it("should return 401 if no token is provided", async () => {
        const res = await request(app)
            .delete("/prompts");

        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Token not provided");
    });

    it("should return 401 if the token is invalid", async () => {
        const res = await request(app)
            .delete("/prompts")
            .set("Cookie", [`token=invalid-token`]);

        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Token is not verified");
    });

    it("should return 500 if deleteAllPromptsService throws an error", async () => {
        (deleteAllPromptsService as jest.Mock).mockRejectedValue(new Error("DB error"));

        const res = await request(app)
            .delete("/prompts")
            .set("Cookie", [`token=${token}`]);

        expect(res.status).toBe(500);
        expect(res.body.error).toBe("Something went wrong");
    });

    it("should return 200 and the prompt for a valid user and promptId", async () => {
        (getPromptService as jest.Mock).mockResolvedValue(mockPrompt);

        const res = await request(app)
            .get(`/prompts/${mockPrompt.id}`)
            .set("Cookie", [`token=${token}`]);

        expect(res.status).toBe(200);
        expect(res.body.prompt).toMatchObject({
            id: mockPrompt.id,
            userId: mockPrompt.userId,
            role: mockPrompt.role,
            context: mockPrompt.context,
            task: mockPrompt.task,
            output: mockPrompt.output,
            constraints: mockPrompt.constraints,
            language: mockPrompt.language,
        });

        expect(getPromptService).toHaveBeenCalledWith(mockUser.id, mockPrompt.id);
    });

    it("should return 404 if the prompt does not exist", async () => {
        (getPromptService as jest.Mock).mockResolvedValue(null);

        const res = await request(app)
            .get(`/prompts/non-existent-id`)
            .set("Cookie", [`token=${token}`]);

        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Prompt not found");
    });

    it("should return 404 if the route is incorrect or promptId is missing", async () => {
        const res = await request(app)
            .get("/prompts/") // trailing slash but no ID
            .set("Cookie", [`token=${token}`]);

        expect(res.status).toBe(404);
    });

    it("should return 400 if userId or promptId is missing", async () => {
        const res = await request(app)
            .get(`/prompts/${mockPrompt.id}`)
            // no cookie = no userId from middleware
            .send();

        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Token not provided");
    });

    it("should return 401 if no token is provided", async () => {
        const res = await request(app)
            .get(`/prompts/${mockPrompt.id}`)
            .send();

        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Token not provided");
    });

    it("should return 401 for an invalid token", async () => {
        const res = await request(app)
            .get(`/prompts/${mockPrompt.id}`)
            .set("Cookie", [`token=invalid-token`]);

        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Token is not verified");
    });


});