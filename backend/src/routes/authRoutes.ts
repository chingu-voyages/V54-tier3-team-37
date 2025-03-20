import { Router } from "express";

import { authController } from "../controllers/index.ts";

export const authRoute: Router = Router({});

// GitHub OAuth
authRoute.get("/auth/github", authController.githubSignIn);
authRoute.get("/github-callback", authController.githubCallback);

authRoute.post("/logout", authController.logout);
