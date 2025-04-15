import {beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import request from "supertest";
import express from "express";
import cookieParser from "cookie-parser";
import {getSignedTestJWT, JWT_SECRET} from "../../__mocks__/getSignedTestJWT";
import {createMockUser, MockUser} from "../../__mocks__/mockUsersRoute";
import {promptRoute} from "../../src/routes";
import {getUserById} from "../../src/controllers/userController";
import { authMiddleware } from "../../src/middleware";
import {checkDuplicatePrompt, savePromptService, updatePromptScoreService} from "../../src/services/promptService";
import {validPrompt} from "../../__mocks__/mockPrompts";

let app: express.Express;

jest.mock("../../src/services/promptService", () => ({
    savePromptService: jest.fn(),
    updatePromptScoreService: jest.fn(),
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

    it("should update score and return 200", async () => {

        (checkDuplicatePrompt as jest.Mock).mockResolvedValue(false);
        (savePromptService as jest.Mock).mockResolvedValue({
            ...validPrompt,
            id: "test-prompt-id",
            userId: mockUser.id,
            createdAt: new Date().toISOString(),
        });

        const savedPromptRes = await request(app)
            .post("/prompts/save")
            .set("Cookie", [`token=${token}`])
            .send(validPrompt);

        const savedPrompt = savedPromptRes.body;
        const promptId = savedPrompt.id;

        (updatePromptScoreService as jest.Mock).mockResolvedValue({
            ...savedPrompt,
            score: 3,
        });

        const res = await request(app)
            .put(`/prompts/${savedPrompt.id}`)
            .set("Cookie", [`token=${token}`])
            .send({score: 3});

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            id: savedPrompt.id,
            score: 3,
        });

        expect(updatePromptScoreService).toHaveBeenCalledWith(
            mockUser.id,
            promptId,
            3
        );
    });

    it("should return 400 if score is missing", async () => {
        const res = await request(app)
            .put("/prompts/test-prompt-id")
            .set("Cookie", [`token=${token}`])
            .send({}); // missing score

        expect(res.status).toBe(400);
        expect(res.body).toEqual({error: "Missing or invalid score"});
    });

    it("should return 400 if score is not a number", async () => {
        const res = await request(app)
            .put("/prompts/test-prompt-id")
            .set("Cookie", [`token=${token}`])
            .send({score: "invalid"}); // string instead of number

        expect(res.status).toBe(400);
        expect(res.body).toEqual({error: "Missing or invalid score"});
    });

    it("should return 401 if token is not provided", async () => {
        const res = await request(app)
            .put("/prompts/test-prompt-id")
            .send({score: 5});

        expect(res.status).toBe(401);
        expect(res.body).toEqual({
            error: "Access denied",
            message: "Token not provided",
        });
    });

    it("should return 404 if prompt not found or unauthorized", async () => {
        (updatePromptScoreService as jest.Mock).mockResolvedValue(null);

        const res = await request(app)
            .put("/prompts/nonexistent-id")
            .set("Cookie", [`token=${token}`])
            .send({score: 3});

        expect(res.status).toBe(404);
        expect(res.body).toEqual({
            error: "Prompt not found or not authorized",
        });
    });

    it("should return 500 if updatePromptScoreService throws", async () => {
        (updatePromptScoreService as jest.Mock).mockRejectedValue(
            new Error("DB failure")
        );

        const res = await request(app)
            .put("/prompts/test-prompt-id")
            .set("Cookie", [`token=${token}`])
            .send({score: 3});

        expect(res.status).toBe(500);
        expect(res.body).toEqual({error: "Something went wrong"});
    });

});