import { Request } from "express";
import { Octokit } from "octokit";
import {
  type OAuthAppAuthInterface,
  createOAuthAppAuth,
} from "@octokit/auth-oauth-app";
import { GSession } from "../types/types.js";
import {
  GITHUB_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_REDIRECT_URL,
  GITHUB_CALLBACK_URL,
} from "../config/authConfig.js";

import { extractCode } from "../utils/index.js";

export class GitHubAPIError extends Error {
  constructor(message: string) {
    // Call the constructor of the base class `Error`
    // And set the error name to the custom error class name
    super(message);
    this.name = "GitHubAPIError";
    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, GitHubAPIError.prototype);
  }
}

export const throwGitHubError = (error: unknown): never => {
  if (error instanceof Error) {
    throw new GitHubAPIError(error.message);
  }
  throw new GitHubAPIError(String(error));
};

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
      // INTERACT WITH DATABASE HERE  <-----------------------------------
      // interactWithDatabase(user);  <-----------------------------------
      const { email, name } = user;
      return { email, name };
    } catch (error) {
      console.error(error);
      throwGitHubError(error);
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
      const { name, avatar_url } = user;
      const { data: emails } =
        await octokit.rest.users.listEmailsForAuthenticatedUser();
      const email = emails.find((obj) => obj.primary)?.email;
      if (name && email) {
        return { name, email, avatar_url };
      }
      return;
    } catch (error) {
      throwGitHubError(error);
    }
  };
}

export const githubAuth = new GitHubAuth(
  String(GITHUB_CLIENT_ID),
  String(GITHUB_CLIENT_SECRET),
  GITHUB_REDIRECT_URL,
  GITHUB_CALLBACK_URL
);
