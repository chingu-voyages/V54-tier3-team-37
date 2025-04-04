import {beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import request from "supertest";
import {createPromptService, savePromptOutputService} from "../../src/services/promptService";
import express from "express";
import {getSignedTestJWT, JWT_SECRET} from "../../__mocks__/getSignedTestJWT";
import {createMockUser, MockUser} from "../../__mocks__/mockUsersRoute";
import cookieParser from "cookie-parser";
import {promptRoute} from "../../src/routes";
import {findUserById} from "../../src/controllers";
import {getUserById} from "../../src/controllers/userController";
import {Language} from "@prisma/client";
import {generateGeminiResponse} from "../../src/services/geminiService";
import {GeminiResponseType} from "../../src/types/promptTypes";


jest.mock("../../src/services/promptService", () => ({
    createPromptService: jest.fn(),
    updatePromptService: jest.fn(),
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

const mockGeminiResponse: GeminiResponseType = {
    text: "some long response...",
    summary: "short summary",
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


    beforeEach(() => {
        jest.clearAllMocks();

        mockUser = createMockUser();
        token = getSignedTestJWT(mockUser);

        (findUserById as jest.Mock).mockResolvedValue(mockUser);
        (getUserById as jest.Mock).mockResolvedValue(mockUser);

    });


    it("should create a prompt and return 201 with data", async () => {
        (generateGeminiResponse as jest.Mock).mockResolvedValue(mockGeminiResponse);

        const res = await request(app)
            .post("/prompts")
            .set("Cookie", [`token=${token}`])
            .send({prompt: promptInput});

        expect(res.status).toBe(200);

        expect(res.body).toMatchObject({
            role: promptInput.role,
            context: promptInput.context,
            task: promptInput.task,
            output: promptInput.output,
            constraints: promptInput.constraints,
            language: promptInput.language,
            geminiText: mockGeminiResponse.text,
            geminiSummary: mockGeminiResponse.summary,
        });

        expect(generateGeminiResponse).toHaveBeenCalled();
        expect(createPromptService).not.toHaveBeenCalled();
        expect(savePromptOutputService).not.toHaveBeenCalled();
    });

    it("should return 400 if prompt is missing from body", async () => {
        const res = await request(app)
            .post("/prompts")
            .set("Cookie", [`token=${token}`])
            .send({}); // no prompt

        expect(res.status).toBe(400);
        expect(res.body).toEqual({error: "Prompt is required"});

        expect(generateGeminiResponse).not.toHaveBeenCalled();
    });

    it("should return 500 if generateGeminiResponse throws an error", async () => {
        (generateGeminiResponse as jest.MockedFunction<typeof generateGeminiResponse>)
            .mockRejectedValue(new Error("Gemini failure"));

        const res = await request(app)
            .post("/prompts")
            .set("Cookie", [`token=${token}`])
            .send({prompt: promptInput});

        expect(res.status).toBe(500);
        expect(res.body).toEqual({error: "Something went wrong"});

        expect(generateGeminiResponse).toHaveBeenCalled();
    });

    it("should return 200 with empty fields if Gemini returns no text", async () => {
        (generateGeminiResponse as jest.MockedFunction<typeof generateGeminiResponse>)
            .mockResolvedValue({text: "", summary: ""});

        const res = await request(app)
            .post("/prompts")
            .set("Cookie", [`token=${token}`])
            .send({prompt: promptInput});

        expect(res.status).toBe(200);
        expect(res.body.geminiText).toBe("");
        expect(res.body.geminiSummary).toBe("");

        expect(generateGeminiResponse).toHaveBeenCalled();
    });

});