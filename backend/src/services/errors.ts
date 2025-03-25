export class GoogleAPIError extends Error {
  constructor(message: string) {
    // Call the constructor of the base class `Error`
    // And set the error name to the custom error class name
    super(message);
    this.name = "GoogleAPIError";
    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, GoogleAPIError.prototype);
  }
}

export const throwGoogleError = (error: Error | string) => {
  throw new GoogleAPIError(
    error instanceof Error ? error.message : String(error)
  );
};

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

export const throwGitHubError = (error: Error | string) => {
  throw new GitHubAPIError(
    error instanceof Error ? error.message : String(error)
  );
};
