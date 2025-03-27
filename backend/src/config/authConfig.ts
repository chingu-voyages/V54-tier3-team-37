import { isProduction } from "./settings.js";

// GitHub OAuth variables
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;

export const GITHUB_REDIRECT_URL = `https://github.com/login/oauth/authorize?`;
export const GITHUB_CALLBACK_URL =
  "https://v54-tier3-team-37.onrender.com/auth/github-callback";

// Google OAuth variables
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_CALLBACK_URL_DEV = "http://localhost:8000/google-callback";
export const GOOGLE_CALLBACK_URL_PROD =
  "https://v54-tier3-team-37.onrender.com/google-callback";

export const GOOGLE_CALLBACK_URL = isProduction
  ? GOOGLE_CALLBACK_URL_PROD
  : GOOGLE_CALLBACK_URL_DEV;

export const GOOGLE_OAUTH_SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];
