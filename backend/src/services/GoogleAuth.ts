import { type Auth, google } from "googleapis";

import { extractCode } from "../utils/extractQueryCode.ts";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  GOOGLE_OAUTH_SCOPES,
} from "../config/index.ts";
import { interactWithDatabase } from "../controllers/index.ts";

class GoogleAPIError extends Error {
  constructor(message: string) {
    // Call the constructor of the base class `Error`
    // And set the error name to the custom error class name
    super(message);
    this.name = "GoogleAPIError";
    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, GoogleAPIError.prototype);
  }
}

const throwGoogleError = (error: any) => {
  throw new GoogleAPIError(
    error instanceof Error ? error.message : String(error)
  );
};

class GoogleAuth {
  private authClient: Auth.OAuth2Client;
  private oauth2;
  private scopes: string;
  constructor(
    private readonly clientId: string,
    private readonly clientSecret: string,
    private readonly callbackUrl: string,
    private readonly unjoinedScopes: string[]
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
    this.scopes = unjoinedScopes.join(" ");
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

  authenticate = async (req: any) => {
    try {
      // Extract authorization code that will be exchanged for user tokens
      const code = extractCode(req, req.session.googleAuthState);
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
        // Get user email and name
        const user = await this.getUserInfo();
        if (!user) return;
        interactWithDatabase(user);
        return user;
      }
    } catch (error) {
      console.error(error);
      throwGoogleError(error);
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
      const { email, name } = data;
      if (name && email) {
        return { email, name };
      }
      return;
    } catch (error) {
      throwGoogleError(error);
    }
  };
}

export const googleAuth = new GoogleAuth(
  String(GOOGLE_CLIENT_ID),
  String(GOOGLE_CLIENT_SECRET),
  GOOGLE_CALLBACK_URL,
  GOOGLE_OAUTH_SCOPES
);
