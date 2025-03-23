import { CookieOptions, Request, Response } from "express";
import { githubAuth, googleAuth } from "../services/index.ts";

import {
  LOGGED_IN_REACT_ADDRESS,
  HOME_REACT_ADDRESS,
} from "../config/index.ts";
import { generateToken, generateRandomHexString } from "../utils/index.ts";
import { GSession, UserPayload } from "../types/index.ts";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
};

const handleSignIn = async (
  req: Request,
  res: Response,
  authService: any,
  sessionState: string
) => {
  try {
    const state = generateRandomHexString();
    (req.session as GSession)[sessionState] = state;
    // Generate a url that asks permissions defined scopes
    const authorizationUrl = authService.generateAuthUrl(state);
    // Redirect the user to authorizationUrl
    res.redirect(authorizationUrl);
  } catch (error) {
    console.error(error);
    res.end(error);
  }
};

const handleCallback = async (
  req: Request,
  res: Response,
  authService: any,
  sessionState: string
) => {
  try {
    const user = await authService.authenticate(req);
    if (!user) return;
    sendCookieAndRedirect(res, user);
  } catch (error) {
    console.error(error);
    const redirectUrl = `${HOME_REACT_ADDRESS}/?error=${error}`;
    // =======================================
    // Warn for testing purposes
    console.warn(`Redirecting to: ${redirectUrl}`);
    // =======================================
    res.redirect(String(redirectUrl));
  } finally {
    (req.session as GSession)[sessionState] = "";
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // clear user session
    res.clearCookie("token", cookieOptions);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

// =======================================
// GitHub
// =======================================
export const githubSignIn = async (req: Request, res: Response) => {
  handleSignIn(req, res, githubAuth, "githubAuthState");
};

export const githubCallback = async (req: Request, res: Response) => {
  handleCallback(req, res, githubAuth, "githubAuthState");
};

// =======================================
// Google
// =======================================
export const googleSignIn = async (req: Request, res: Response) => {
  handleSignIn(req, res, googleAuth, "googleAuthState");
};

export const googleCallback = async (req: Request, res: Response) => {
  handleCallback(req, res, googleAuth, "googleAuthState");
};

// =======================================
// Send cookie and redirect to React
// =======================================
const sendCookieAndRedirect = (res: Response, user: UserPayload) => {
  try {
    const token = generateToken(user);
    res.cookie("token", token, cookieOptions);
    res.redirect(LOGGED_IN_REACT_ADDRESS);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
