import {beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import request from "supertest";
import {createPromptService, getPromptService} from "../../src/services/promptService";
import express from "express";
import {getSignedTestJWT, JWT_SECRET} from "../../__mocks__/getSignedTestJWT";
import {createMockUser, MockUser} from "../../__mocks__/mockUsersRoute";
import cookieParser from "cookie-parser";
import {promptRoute} from "../../src/routes";
import {findUserById} from "../../src/controllers";
import {deleteUserById, getUserById} from "../../src/controllers/userController";
import {Language, Prompt} from "@prisma/client";
import * as promptController from "../../src/controllers/promptController";


// jest.mock("../../src/services/promptService", () => ({
//     createPromptService: jest.fn(),
//     getPromptService: jest.fn(),
// }));

jest.mock("../../src/controllers/promptController", () => ({
    createPrompt: jest.fn(),
    // getPromptById: jest.fn(),
}));

jest.mock("../../src/controllers/findOrCreateUser", () => ({
    findUserById: jest.fn(),
}));

jest.mock("../../src/controllers/userController", () => ({
    getUserById: jest.fn(),
    deleteUserById: jest.fn(),
}));

let app: express.Express;

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

        (findUserById as jest.Mock).mockResolvedValue(mockUser);
        (getUserById as jest.Mock).mockResolvedValue(mockUser);
        (deleteUserById as jest.Mock).mockResolvedValue(mockUser);

        router.post("/", authMiddleware, (req, res) => {
            // Mock implementation for createPrompt
            if (!req.body.prompt) {
                return res.status(400).json({ error: "Prompt is required" });
            }
            return res.status(201).json({ prompt: mockPrompt });
        });

        // (promptController.getPrompt as jest.Mock).mockImplementation((req, res) => {
        //     if (!req.params.promptId) {
        //         res.status(400).json({error: "Prompt ID is required"});
        //         return;
        //     }
        //
        //     // For testing the not found case
        //     if (req.params.promptId === "non-existent-id") {
        //         res.status(404).json({error: "Prompt not found"});
        //         return;
        //     }
        //
        //     // For testing the error case
        //     if (req.params.promptId === "error-id") {
        //         res.status(500).json({error: "Something went wrong"});
        //         return;
        //     }
        //
        //     res.status(200).json({prompt: mockPrompt});
        });
    });


    it("should create a prompt and return 201 with data", async () => {
        // (createPromptService as jest.Mock).mockResolvedValue(mockPrompt);

        const promptInput = {
            role: "Test Role",
            context: "Some context",
            task: "Test task",
            output: "Expected output",
            constraints: "None",
            language: Language.EN,
        };

        const res = await request(app)
            .post("/prompts")
            .set("Cookie", [`token=${token}`])
            .send({prompt: promptInput});

        expect(res.status).toBe(201);
        expect(res.body.prompt).toMatchObject({
            id: "test-prompt-id",
            role: "Test Role",
            context: "Some context",
        });
    });

    // it("should return 400 if prompt is missing in request body", async () => {
    //     const res = await request(app)
    //         .post("/prompts")
    //         .set("Cookie", [`token=${token}`])
    //         .send({});
    //
    //     expect(res.status).toBe(400);
    //     expect(res.body.error).toBe("Prompt is required");
    // });
    //
    // it("should return 500 if createPromptService throws an error", async () => {
    //     const originalError = console.error;
    //     console.error = jest.fn();
    //     (createPromptService as jest.Mock).mockRejectedValue(new Error("DB error"));
    //
    //     const promptInput = {
    //         role: "Test Role",
    //         context: "Some context",
    //         task: "Test task",
    //         output: "Expected output",
    //         constraints: "None",
    //         language: Language.EN,
    //     };
    //
    //     const res = await request(app)
    //         .post("/prompts")
    //         .set("Cookie", [`token=${token}`])
    //         .send({prompt: promptInput});
    //
    //     expect(res.status).toBe(500);
    //     expect(res.body.error).toBe("Something went wrong");
    // });
    //
    // it("should return 401 if token is missing", async () => {
    //     const res = await request(app)
    //         .post("/prompts")
    //         .send({prompt: {role: "X"}});
    //
    //     expect(res.status).toBe(401);
    //     expect(res.body.message).toBe("Token not provided");
    // });
    //
    // it("should get a prompt by ID and return 200 with data", async () => {
    //     (getPromptService as jest.Mock).mockResolvedValue(mockPrompt);
    //
    //     const res = await request(app)
    //         .get(`/prompts/${mockPrompt.id}`)
    //         .set("Cookie", [`token=${token}`]);
    //
    //     expect(res.status).toBe(200);
    //     // expect(res.body.prompt).toMatchObject({
    //     //     id: "test-prompt-id",
    //     //     role: "Test Role",
    //     //     context: "Some context",
    //     // });
    //     // expect(getPromptService).toHaveBeenCalledWith(mockUser.id, mockPrompt.id);
    // });

});