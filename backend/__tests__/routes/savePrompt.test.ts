import {beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import request from "supertest";
import express from "express";
import {getSignedTestJWT, JWT_SECRET} from "../../__mocks__/getSignedTestJWT";
import {createMockUser, MockUser} from "../../__mocks__/mockUsersRoute";
import cookieParser from "cookie-parser";
import {promptRoute} from "../../src/routes";
import {validPrompt} from "../../__mocks__/mockPrompts";
import {getUserById} from "../../src/controllers/userController";
import {checkDuplicatePrompt, savePromptService} from "../../src/services/promptService";
import { authMiddleware } from "../../src/middleware";

let app: express.Express;

jest.mock("../../src/services/promptService", () => ({
    savePromptService: jest.fn(),
    checkDuplicatePrompt: jest.fn(),
}));


jest.mock("../../src/controllers/userController", () => ({
    getUserById: jest.fn(),
    deleteUserById: jest.fn(),
}));

beforeAll(() => {
    app = express();
    app.use(cookieParser());
    app.use(express.json());
    app.use("/prompts", authMiddleware, promptRoute);
});


describe("prompt controller", () => {
    process.env.JWT_SECRET = JWT_SECRET;
    let mockUser: MockUser;
    let token: string;


    beforeEach(() => {
        jest.clearAllMocks();

        mockUser = createMockUser();
        token = getSignedTestJWT(mockUser);

        (getUserById as jest.Mock).mockResolvedValue(mockUser);
    });

    it("should save prompt and return 200", async () => {
        (checkDuplicatePrompt as jest.Mock).mockResolvedValue(false);
        (savePromptService as jest.Mock).mockResolvedValue({
            ...validPrompt,
            userId: mockUser.id,
            createdAt: new Date().toISOString(),
        });

        const res = await request(app)
            .post("/prompts/save")
            .set("Cookie", [`token=${token}`])
            .send(validPrompt);

        expect(res.status).toBe(200);
        expect(savePromptService).toHaveBeenCalledWith({
            ...validPrompt,
            userId: mockUser.id,
        });
    });

    it("should return 400 if geminiText or geminiSummary missing", async () => {
        const res = await request(app)
            .post("/prompts/save")
            .set("Cookie", [`token=${token}`])
            .send({
                ...validPrompt, geminiText: "", geminiSummary: null,
            });

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            error: "'geminiText' and 'geminiSummary' are required.",
        });
    });

    it("should return 400 for invalid score", async () => {
        const res = await request(app)
            .post("/prompts/save")
            .set("Cookie", [`token=${token}`])
            .send({
                ...validPrompt, score: "not-a-number",
            });

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            error: "Score must be a number if provided",
        });
    });

    it("should return 401 if no token", async () => {
        const res = await request(app)
            .post("/prompts/save")
            .send(validPrompt);

        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Token not provided");
    });

    it("should return 409 if duplicate prompt found", async () => {
        (checkDuplicatePrompt as jest.Mock).mockResolvedValue(true);

        const res = await request(app)
            .post("/prompts/save")
            .set("Cookie", [`token=${token}`])
            .send(validPrompt);

        expect(res.status).toBe(409);
        expect(res.body).toEqual({
            error: "Prompt already exists",
        });
    });

    it("should return 500 if service throws unexpected error", async () => {
        (checkDuplicatePrompt as jest.Mock).mockResolvedValue(false);
        (savePromptService as jest.Mock).mockRejectedValue(new Error("DB crash"));

        const res = await request(app)
            .post("/prompts/save")
            .set("Cookie", [`token=${token}`])
            .send(validPrompt);

        expect(res.status).toBe(500);
        expect(res.body).toEqual({error: "Something went wrong"});
    });

});