import { Request } from "express";
import { Octokit } from "octokit";
import {
  type OAuthAppAuthInterface,
  createOAuthAppAuth,
} from "@octokit/auth-oauth-app";

import {
  GITHUB_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_REDIRECT_URL,
  GITHUB_CALLBACK_URL,
} from "../config/authConfig.js";
import { findOrCreateUserId } from "../controllers/index.js";
import { extractCode } from "../utils/index.js";
import { throwGitHubError } from "./errors.js";
import { GSession } from "../types/types.js";

class GitHubAuth {
  private auth: OAuthAppAuthInterface;
  private scope: string[] = ["user:email"];
  constructor(
    private readonly clientId: string,
    private readonly clientSecret: string,
    private readonly redirectUrl: string,
    private readonly callbackUrl: string
  ) {
    // Initialize the OAuth2 client for Google authentication
    // This handles sign-in, token exchange, and token refreshing
    this.auth = createOAuthAppAuth({
      clientId,
      clientSecret,
    });
  }

  generateAuthUrl = (state: string) => {
    return `${this.redirectUrl}client_id=${this.clientId}&redirect_uri=${this.callbackUrl}&scope=${this.scope}&state=${state}`;
  };

  authenticate = async (req: Request) => {
    try {
      // Extract authorization code that will be exchanged for user tokens
      const code = extractCode(req, (req.session as GSession).githubAuthState);
      // Because we are communicating directly with a GitHub server,
      // We can be confident that the token is valid
      const access_token = await this.getAccessToken(String(code));
      (req.session as GSession).token = access_token;
      // Get name, email and avatar url
      const user = await this.getUserInfo(access_token);
      if (!user) return;
      const userId = await findOrCreateUserId(user);
      return { id: userId, displayName: user.displayName, email: user.email };
    } catch (error) {
      console.error(error);
      throwGitHubError(String(error));
    }
  };

  getAccessToken = async (code: string) => {
    const { token } = await this.auth({
      type: "oauth-user",
      code: String(code),
    });
    if (!token) {
      throwGitHubError("failed to exchange code for token");
    }
    return token;
  };

  getUserInfo = async (token: string) => {
    try {
      const octokit = new Octokit({ auth: token });
      const { data: user } = await octokit.rest.users.getAuthenticated();
      const { name: displayName, avatar_url } = user;
      const { data: emails } =
        await octokit.rest.users.listEmailsForAuthenticatedUser();
      const email = emails.find((obj) => obj.primary)?.email;
      if (displayName && email) {
        return { displayName, email, avatar_url };
      }
      return;
    } catch (error) {
      throwGitHubError(String(error));
    }
  };
}

export const githubAuth = new GitHubAuth(
  String(GITHUB_CLIENT_ID),
  String(GITHUB_CLIENT_SECRET),
  GITHUB_REDIRECT_URL,
  GITHUB_CALLBACK_URL
);
