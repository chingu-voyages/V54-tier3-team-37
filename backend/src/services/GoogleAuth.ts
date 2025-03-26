import { Request } from "express";
import { type Auth, google } from "googleapis";
import { extractCode } from "../utils/extractQueryCode.js";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  GOOGLE_OAUTH_SCOPES,
} from "../config/authConfig.js";
import { findOrCreateUserId } from "../controllers/index.js";
import { throwGoogleError } from "./errors.js";
import { GSession } from "../types/index.ts";

class GoogleAuth {
  private authClient: Auth.OAuth2Client;
  private oauth2;
  constructor(
    private readonly clientId: string,
    private readonly clientSecret: string,
    private readonly callbackUrl: string,
    private readonly scopes: string
  ) {
    // Initialize the OAuth2 client for Google authentication
    // This handles sign-in, token exchange, and token refreshing
    this.authClient = new google.auth.OAuth2(
      clientId,
      clientSecret,
      callbackUrl
    );
    // Provides access to the Google OAuth2 API, which allows
    // to retrieve the user's profile data (name, email)
    this.oauth2 = google.oauth2({ version: "v2", auth: this.authClient });
    // Join the provided OAuth scopes into a single space-separated string
    // Required for generating the authorization URL
    this.scopes = scopes;
  }

  generateAuthUrl = (state: string) => {
    return this.authClient.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: "offline",
      /** Pass in the scopes array defined above.
       * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
      scope: this.scopes,
      // Enable incremental authorization. Recommended as a best practice.
      include_granted_scopes: true,
      // Include the state parameter to reduce the risk of CSRF attacks.
      state,
    });
  };

  authenticate = async (req: Request) => {
    try {
      // Extract authorization code that will be exchanged for user tokens
      const code = extractCode(req, (req.session as GSession).googleAuthState);
      // Because we are communicating directly with a Google server,
      // We can be confident that the token is valid
      const { tokens } = await this.getToken(code);
      // setCredentials(tokens) only stores the tokens in memory.
      // If your server restarts, they will be lost unless you persisted
      this.authClient.setCredentials(tokens);
      // Check if we have permission to get user info
      if (
        tokens.scope &&
        tokens.scope.includes(GOOGLE_OAUTH_SCOPES[0]) &&
        tokens.scope.includes(GOOGLE_OAUTH_SCOPES[1])
      ) {
        // Get user email, name and picture
        const user = await this.getUserInfo();
        if (!user) return;
        const userId = await findOrCreateUserId(user);
        return { id: userId, displayName: user.displayName, email: user.email };
      }
    } catch (error) {
      console.error(error);
      throwGoogleError(String(error));
    }
  };

  getToken = async (code: string) => {
    const tokens = this.authClient.getToken(code);
    if (!tokens) throwGoogleError("failed to obtain access token");
    return tokens;
  };

  getUserInfo = async () => {
    try {
      const { data } = await this.oauth2.userinfo.get();
      const { email, name: displayName, picture } = data;
      if (displayName && email) {
        return { email, displayName, picture };
      }
      return;
    } catch (error) {
      throwGoogleError(String(error));
    }
  };
}

export const googleAuth = new GoogleAuth(
  String(GOOGLE_CLIENT_ID),
  String(GOOGLE_CLIENT_SECRET),
  GOOGLE_CALLBACK_URL,
  GOOGLE_OAUTH_SCOPES.join(" ")
);
