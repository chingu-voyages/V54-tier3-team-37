import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";
import {beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import {userRoute} from "../../src/routes";
import {createMockUserAndToken, MockUser} from "../../__mocks__/mockUsersRoute";
import {findUserById} from "../../src/controllers";
import {getUserById} from "../../src/controllers/userController";


jest.mock("../../src/controllers/findOrCreateUser", () => ({
    findUserById: jest.fn(),
}));

jest.mock("../../src/controllers/userController", () => ({
    getUserById: jest.fn(),
}));


let app: express.Express;

beforeAll(() => {
    app = express();
    app.use(cookieParser());
    app.use(express.json());
    app.use("/users", userRoute);
});

describe("GET /users/me", () => {
    let mockUser: MockUser;
    let token: string;

    beforeEach(() => {
        const result = createMockUserAndToken();
        mockUser = result.user;
        token = result.token;

        (findUserById as jest.Mock).mockResolvedValue(mockUser);
        (getUserById as jest.Mock).mockResolvedValue(mockUser);
    });

    it("should return 200 and user data", async () => {
        const res = await request(app)
            .get("/users/me")
            .set("Cookie", [`token=${token}`]);

        expect(res.status).toBe(200);
        expect(res.body.user).toMatchObject({
            id: mockUser.id,
            email: mockUser.email,
            displayName: mockUser.displayName,
            imageUrl: mockUser.imageUrl,
            createdAt: mockUser.createdAt.toISOString(),
        });
    });

    it("should return 401 if token is missing", async () => {
        const res = await request(app).get("/users/me");

        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Token not provided");
    });

    it("should return 401 if user is not found during auth", async () => {
        (findUserById as jest.Mock).mockResolvedValue(null);

        const res = await request(app)
            .get("/users/me")
            .set("Cookie", [`token=${token}`]);

        expect(res.status).toBe(401);
        expect(res.body.error).toBe("User not found");
    });

    it("should return 401 if token is invalid", async () => {
        const originalConsoleError = console.error;
        console.error = jest.fn();

        const res = await request(app)
            .get("/users/me")
            .set("Cookie", [`token=invalid.jwt.token`]);

        expect(res.status).toBe(401);
        expect(res.body.error).toBe("Access denied");

        console.error = originalConsoleError; // restore after test
    });

    it("should return 404 if user is not found after auth", async () => {
        (getUserById as jest.Mock).mockResolvedValue(null);

        const res = await request(app)
            .get("/users/me")
            .set("Cookie", [`token=${token}`]);

        expect(res.status).toBe(404);
        expect(res.body.error).toBe("User not found");
    });
});
