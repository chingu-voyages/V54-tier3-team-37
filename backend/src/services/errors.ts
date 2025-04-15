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

export const throwGoogleError = (error: unknown): never => {
  if (error instanceof Error) {
    throw new GoogleAPIError(error.message);
  }
  throw new GoogleAPIError(String(error));
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

export const throwGitHubError = (error: unknown): never => {
  if (error instanceof Error) {
    throw new GitHubAPIError(error.message);
  }
  throw new GitHubAPIError(String(error));
};

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class DuplicatePromptError extends Error {
  constructor(message = "Prompt already exists") {
    super(message);
    this.name = "DuplicatePromptError";
    Object.setPrototypeOf(this, DuplicatePromptError.prototype);
  }
}

export class GeminiAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GeminiAPIError";
    Object.setPrototypeOf(this, GeminiAPIError.prototype);
  }
}
