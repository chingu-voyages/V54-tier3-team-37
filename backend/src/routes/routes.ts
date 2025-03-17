import express from "express";
import { authController } from "../controllers/index.ts";

export const router = express.Router();

// Google OAuth
router.get("/auth/google", authController.googleSignIn);
router.get("/google-callback", authController.googleCallback);

// GitHub OAuth
router.get("/auth/github", authController.githubSignIn);
router.get("/github-callback", authController.githubCallback);
