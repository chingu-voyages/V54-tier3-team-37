// GitHub OAuth variables
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;

export const GITHUB_REDIRECT_URL = `https://github.com/login/oauth/authorize?`;
export const GITHUB_CALLBACK_URL =
  "https://v54-tier3-team-37.onrender.com/github-callback";

// Google OAuth variables
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const production = process.env.NODE_ENV === "production";
export const GOOGLE_CALLBACK_URL = production
  ? "https://v54-tier3-team-37.onrender.com/google-callback"
  : "http://localhost:8000/google-callback";

export const GOOGLE_OAUTH_SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];
