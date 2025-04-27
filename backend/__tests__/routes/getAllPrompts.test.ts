import {beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import request from "supertest";
import express from "express";
import {getSignedTestJWT, JWT_SECRET} from "../../__mocks__/getSignedTestJWT";
import {createMockUser, MockUser} from "../../__mocks__/mockUsersRoute";
import cookieParser from "cookie-parser";
import {promptRoute} from "../../src/routes";
import {getMockPromptList} from "../../__mocks__/mockPrompts";
import {getUserById} from "../../src/controllers/userController";
import {getAllPromptsService} from "../../src/services/promptService";
import { authMiddleware } from "../../src/middleware";

let app: express.Express;

jest.mock("../../src/services/promptService", () => ({
    getAllPromptsService: jest.fn(),
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

    it("should return all prompts for authorized user", async () => {
        const mockPrompts = getMockPromptList(mockUser.id);
        (getAllPromptsService as jest.Mock).mockResolvedValue(mockPrompts);

        const response = await request(app)
            .get("/prompts")
            .set("Cookie", [`token=${token}`]);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockPrompts);
        expect(getAllPromptsService).toHaveBeenCalledWith(mockUser.id);

    });

    it("should return 401 if no token is provided", async () => {

        const response = await request(app)
            .get("/prompts");

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            error: "Access denied",
            message: "Token not provided",
        });
    });

    it("should return 401 if token is invalid", async () => {

        const response = await request(app)
            .get("/prompts")

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            error: "Access denied",
            message: "Token not provided",
        });
    });

    it("should return 404 if user is not found", async () => {
        (getUserById as jest.Mock).mockResolvedValue(null);

        const response = await request(app)
            .get("/prompts")
            .set("Cookie", [`token=${token}`]);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            error: "User not found",
        });
    });

    it("should return 500 if getAllPromptsService throws an error", async () => {
        (getAllPromptsService as jest.Mock).mockRejectedValue(new Error("Service error"));

        const response = await request(app)
            .get("/prompts")
            .set("Cookie", [`token=${token}`]);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({error: "Something went wrong"});
    });

});