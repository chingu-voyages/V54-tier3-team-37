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

jest.mock("../../src/controllers/index", () => ({
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
  findUserById: jest.fn(async (userId: string) => {
    if (userId === mockUsers.validUser[0].id) return mockUsers.validUser[0];
  }),
}));

describe("Router", () => {
  let app: express.Express;
  const mockUser = mockUsers.validUser[0];
  const testToken = getSignedTestJWT(mockUser);

  beforeEach(() => {
    app = express();
    app.use(cookieParser());
    app.use(authRoute);

    app.get("/set-test-cookie", (req, res) => {
      res.cookie("token", testToken);
      res.send("Cookies set");
    });
    process.env.JWT_SECRET = JWT_SECRET;
  });

  test("clears authentication token", async () => {
    const agent = request.agent(app);
    await agent.get("/set-test-cookie").expect(200);
    const response = await agent.post("/logout");

    expect(response.status).toBe(200);
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
