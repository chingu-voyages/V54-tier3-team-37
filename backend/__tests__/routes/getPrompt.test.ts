import {beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import request from "supertest";
import express from "express";
import {getSignedTestJWT, JWT_SECRET} from "../../__mocks__/getSignedTestJWT";
import {createMockUser, MockUser} from "../../__mocks__/mockUsersRoute";
import cookieParser from "cookie-parser";
import {promptRoute} from "../../src/routes";
import {getMockPrompt} from "../../__mocks__/mockPrompts";
import {findUserById} from "../../src/controllers";
import {getUserById} from "../../src/controllers/userController";
import {getPromptService} from "../../src/services/promptService";

let app: express.Express;

jest.mock("../../src/services/promptService", () => ({
    getPromptService: jest.fn(),
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

    it("should return 200 and the prompt if found", async () => {
        const mockPrompt = getMockPrompt(mockUser.id);
        (getPromptService as jest.Mock).mockResolvedValue(mockPrompt);

        const response = await request(app)
            .get(`/prompts/${mockPrompt.id}`)
            .set("Cookie", [`token=${token}`]);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockPrompt);
        expect(getPromptService).toHaveBeenCalledWith(mockUser.id, mockPrompt.id);
    });

    it("should return 401 if token is not provided", async () => {
        const response = await request(app).get("/prompts/some-id");

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            error: "Access denied",
            message: "Token not provided",
        });
    });

    it("should return 404 if prompt is not found", async () => {
        (getPromptService as jest.Mock).mockResolvedValue(null);

        const response = await request(app)
            .get("/prompts/nonexistent-id")
            .set("Cookie", [`token=${token}`]);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "Prompt not found" });
    });

    it("should return 400 if promptId is 'undefined' string", async () => {
        const response = await request(app)
            .get("/prompts/undefined")
            .set("Cookie", [`token=${token}`]);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "Prompt not found" });
    });

    it("should return 500 if service throws an error", async () => {
        (getPromptService as jest.Mock).mockRejectedValue(new Error("DB error"));

        const response = await request(app)
            .get("/prompts/some-id")
            .set("Cookie", [`token=${token}`]);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: "Internal server error" });
    });

});