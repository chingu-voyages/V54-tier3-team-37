// GitHub OAuth variables
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;

export const GITHUB_TOKEN_INFO_URL = process.env.GITHUB_TOKEN_INFO_URL;
export const GITHUB_REDIRECT_URL = `https://github.com/login/oauth/authorize?`;

// Google OAuth variables
export const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL;

export const GOOGLE_CALLBACK_URL = "http://localhost:8000/google-callback";
export const GOOGLE_OAUTH_SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];
