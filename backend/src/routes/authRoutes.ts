import { Router } from "express";

import { authController } from "../controllers/index.js";
import { authMiddleware } from "../middleware/index.js";

export const authRoute: Router = Router({});

// GitHub OAuth
authRoute.get("/auth/github", authController.githubSignIn);
authRoute.get("/auth/github-callback", authController.githubCallback);

// Google OAuth
authRoute.get("/auth/google", authController.googleSignIn);
authRoute.get("/google-callback", authController.googleCallback);

authRoute.post("/logout", authMiddleware, authController.logout);
