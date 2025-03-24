import express, { Request, Response } from "express";
import request from "supertest";
import { describe, expect, beforeEach, jest } from "@jest/globals";

import { authRoute } from "../../src/routes/authRoutes";
import {
  authServices,
  callbacks,
  invalidRoutes,
} from "../../__mocks__/mockRoutes.js";

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
      res.clearCookie("token");
      res.status(200).json({ message: "Logged out successfully" });
    }),
  },
}));

describe("Router", () => {
  let app: express.Express;
  beforeEach(() => {
    app = express();
    app.use(authRoute);
  });

  test("clears authentication token", async () => {
    // Use agent to consturct a request with a cookie
    const agent = request.agent(app);
    agent.set("Cookie", ["token=i-am-cookie"]);

    const response = await agent.post("/logout");
    expect(response.status).toBe(200);
    const responseCookie = response.headers["set-cookie"];
    expect(responseCookie).toEqual([
      "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    ]);
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
