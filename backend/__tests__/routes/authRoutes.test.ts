import express, { Request, Response } from "express";
import request from "supertest";
import cookieParser from "cookie-parser";
import { describe, expect, beforeEach, jest } from "@jest/globals";
import { authRoute } from "../../src/routes/authRoutes";

import { mockUsers } from "../../__mocks__/mockUsers";
import {
  authServices,
  callbacks,
  invalidRoutes,
} from "../../__mocks__/mockRoutes";
import { getSignedTestJWT, JWT_SECRET } from "../../__mocks__/getSignedTestJWT";
import {
  createTestUser,
  deleteTestUser,
} from "../../__mocks__/prismaTestUtils";

jest.mock("../../src/controllers", () => ({
  authController: {
    googleSignIn: jest.fn((req: Request, res: Response) =>
      res.redirect("/mock-google-redirect")
    ),
    googleCallback: jest.fn((req: Request, res: Response) =>
      res.send("Google callback")
    ),
    githubSignIn: jest.fn((req: Request, res: Response) =>
      res.redirect("/mock-github-redirect")
    ),
    githubCallback: jest.fn((req: Request, res: Response) =>
      res.send("GitHub callback")
    ),
    logout: jest.fn((req: Request, res: Response) => {
      res.clearCookie("token", {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: true,
      });
      res.status(200).json({ message: "Logged out successfully" });
    }),
  },
  getUserById: jest.fn(),
}));

describe("Router", () => {
  let newUser;
  let app: express.Express;

  beforeEach(async () => {
    app = express();
    app.use(cookieParser());
    app.use(authRoute);

    const mockUser = mockUsers.authRoutesUser;
    newUser = await createTestUser(mockUser);
    if (!newUser.id) throw Error("failed to create a test user");

    const testToken = getSignedTestJWT(newUser);

    app.get("/set-test-cookie", (req, res) => {
      res.cookie("token", testToken);
      res.send("Cookies set");
    });

    process.env.JWT_SECRET = JWT_SECRET;
  });

  afterEach(async () => {
    const deleted = await deleteTestUser(newUser.id);
    expect(deleted.id).toEqual(newUser.id);
  });

  test("clears authentication token", async () => {
    const agent = request.agent(app);
    await agent.get("/set-test-cookie").expect(200);
    const response = await agent.post("/logout");
    if (response.ok) expect(response.status).toBe(200);
  });

  test("returns 404 for non-existing routes", async () => {
    for (const route of invalidRoutes) {
      const response = await request(app).get(route);

      expect(response.status).toBe(404);
    }
  });

  test("controllers are called on corresponding routes", async () => {
    for (const service of authServices) {
      const { path, controller, redirectPath } = service;
      const response = await request(app).get(path);

      expect(controller).toHaveBeenCalled();
      // Expect a redirect
      expect(response.status).toBe(302);
      expect(response.header.location).toBe(redirectPath);
    }
  });

  test("callbacks are being invoked", async () => {
    for (const callback of callbacks) {
      const { path, controller, mockResponse } = callback;
      const response = await request(app).get(path);

      expect(controller).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.text).toBe(mockResponse);
    }
  });
});
