import {beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import request from "supertest";
import express from "express";
import {getSignedTestJWT, JWT_SECRET} from "../../__mocks__/getSignedTestJWT";
import {createMockUser, MockUser} from "../../__mocks__/mockUsersRoute";
import cookieParser from "cookie-parser";
import {promptRoute} from "../../src/routes";
import {Prompt} from "@prisma/client";
import {generateGeminiResponse} from "../../src/services/geminiService";
import {mockGeminiResponse, promptInput} from "../../__mocks__/mockPrompts";
import {findUserById} from "../../src/controllers";
import {getUserById} from "../../src/controllers/userController";

let app: express.Express;

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

    it("should generate prompt successfully", async () => {
        (generateGeminiResponse as jest.Mock).mockResolvedValue(mockGeminiResponse);

        const res = await request(app)
            .post("/prompts/generate")
            .set("Cookie", [`token=${token}`])
            .send(promptInput);

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            ...promptInput,
            geminiText: mockGeminiResponse.text,
            geminiSummary: mockGeminiResponse.summary,
        });

        expect(generateGeminiResponse).toHaveBeenCalled();
    });

    it("should return 401 if token not provided", async () => {
        const res = await request(app)
            .post("/prompts/generate")
            .send(promptInput);

        expect(res.status).toBe(401);
        expect(res.body).toEqual({
            error: "Access denied",
            message: "Token not provided",
        });
    });

    it("should return 401 if token invalid", async () => {
        const res = await request(app)
            .post("/prompts/generate")
            .set("Cookie", ["token=invalid"])
            .send(promptInput);

        expect(res.status).toBe(401);
        expect(res.body).toEqual({
            error: "Access denied",
            message: "Token is not verified",
        });
    });

    it("should return 401 if user not found", async () => {
        (findUserById as jest.Mock).mockResolvedValue(null);

        const res = await request(app)
            .post("/prompts/generate")
            .set("Cookie", [`token=${token}`])
            .send(promptInput);

        expect(res.status).toBe(401);
        expect(res.body).toEqual({error: "User not found"});
    });

    it("should return 400 for missing fields", async () => {
        const invalidPrompt = {...promptInput};
        delete invalidPrompt.role;

        const res = await request(app)
            .post("/prompts/generate")
            .set("Cookie", [`token=${token}`])
            .send(invalidPrompt);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            error: "Field 'role' is required.",
        });
    });

    it("should return 400 for invalid language", async () => {
        const res = await request(app)
            .post("/prompts/generate")
            .set("Cookie", [`token=${token}`])
            .send({...promptInput, language: "RU"});

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            error: "Invalid language",
        });
    });

    it("should return 500 if Gemini service throws", async () => {
        (generateGeminiResponse as jest.Mock).mockRejectedValue(
            new Error("Gemini crash")
        );

        const res = await request(app)
            .post("/prompts/generate")
            .set("Cookie", [`token=${token}`])
            .send(promptInput);

        expect(res.status).toBe(500);
        expect(res.body).toEqual({error: "Something went wrong"});
    });

});