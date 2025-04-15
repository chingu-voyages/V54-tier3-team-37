import {beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import request from "supertest";
import express from "express";
import {getSignedTestJWT, JWT_SECRET} from "../../__mocks__/getSignedTestJWT";
import {createMockUser, MockUser} from "../../__mocks__/mockUsersRoute";
import cookieParser from "cookie-parser";
import {promptRoute} from "../../src/routes";
import {findUserById} from "../../src/controllers";
import {getUserById} from "../../src/controllers/userController";
import {deletePromptService} from "../../src/services/promptService";

let app: express.Express;

jest.mock("../../src/services/promptService", () => ({
    savePromptService: jest.fn(),
    checkDuplicatePrompt: jest.fn(),
    deletePromptService: jest.fn(),
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
    let promptId: string;


    beforeEach(() => {
        jest.clearAllMocks();

        mockUser = createMockUser();
        token = getSignedTestJWT(mockUser);
        promptId = "test-delete-id";

        (findUserById as jest.Mock).mockResolvedValue(mockUser);
        (getUserById as jest.Mock).mockResolvedValue(mockUser);
    });

    it("should delete prompt and return 204", async () => {


        (deletePromptService as jest.Mock).mockResolvedValue({deletedCount: 1});

        const res = await request(app)
            .delete(`/prompts/${promptId}`)
            .set("Cookie", [`token=${token}`]);

        expect(res.status).toBe(200);
        expect(res.body).toEqual(promptId);
        expect(deletePromptService).toHaveBeenCalledWith(mockUser.id, promptId);
    });

    it("should return 401 if no token is provided", async () => {
        const res = await request(app)
            .delete(`/prompts/${promptId}`); // No cookie

        expect(res.status).toBe(401);
        expect(res.body).toEqual({
            error: "Access denied",
            message: "Token not provided",
        });
    });

    it("should return 404 if prompt not found or not authorized", async () => {
        (deletePromptService as jest.Mock).mockResolvedValue({deletedCount: 0});

        const res = await request(app)
            .delete(`/prompts/${promptId}`)
            .set("Cookie", [`token=${token}`]);

        expect(res.status).toBe(404);
        expect(res.body).toEqual({
            error: "Prompt not found or not authorized",
        });
    });

    it("should return 500 if deletePromptService throws an error", async () => {
        (deletePromptService as jest.Mock).mockRejectedValue(
            new Error("Unexpected DB error")
        );

        const res = await request(app)
            .delete(`/prompts/${promptId}`)
            .set("Cookie", [`token=${token}`]);

        expect(res.status).toBe(500);
        expect(res.body).toEqual({
            error: "Something went wrong",
        });
    });

});