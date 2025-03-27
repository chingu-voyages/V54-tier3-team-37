import {afterAll, beforeAll, describe, expect, it} from "@jest/globals";
import request from "supertest";
import express from "express";
import prisma from "../../src/prisma";
import {userRoute} from "../../src/routes";


let app: express.Express;
let testUserId: string;
let jwtToken: string;

beforeAll(async () => {
    app = express();
    app.use(express.json());
    app.use("/users", userRoute);

    const user = await prisma.user.create({
        data: {
            email: "ermak@gmail.com",
            displayName: "Aigul",
        },
    });

    testUserId = user.email;

    const {generateToken} = await import("../../src/utils/index.js");
    jwtToken = generateToken({email: user.email, name: user.displayName});
});

afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
});

describe("GET /users/:userId", () => {

    it("should return 200 and user profile", async () => {
        const res = await request(app)
            .get(`/users/${testUserId}`)
            .set("Authorization", `Bearer ${jwtToken}`);

        expect(res.status).toBe(200);
        expect(res.body.email).toBe("ermak@gmail.com");
        expect(res.body.displayName).toBe("Aigul");
    });

    it("should return 404 for invalid ID", async () => {
        const res = await request(app)
            .get(`/users/non-existing-id`)
            .set("Authorization", `Bearer ${jwtToken}`);

        expect(res.status).toBe(404);
        expect(res.body.message).toBe("User not found");
    });

    it("should return 401 without token", async () => {
        const res = await request(app)
            .get(`/users/${testUserId}`);

        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Unauthorized: No token provided");
    });
    it("should return 403 for invalid token", async () => {
        const invalidToken = "invalid.jwt.token";
        const res = await request(app)
            .get(`/users/${testUserId}`)
            .set("Authorization", `Bearer ${invalidToken}`);

        expect(res.status).toBe(403);
        expect(res.body.message).toBe("Invalid or expired token");
    });
});
