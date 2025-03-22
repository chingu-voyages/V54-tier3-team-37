import { GitHubAPIError, throwGitHubError } from "../../src/services/index";

const errorMessages = [
  "Error message",
  "foo bar",
  "Jest encountered an unexpected token",
];

describe("throwGitHubError", () => {
  test("throws GitHubAPIError with provided message", () => {
    for (const errorMessage in errorMessages) {
      const error = new Error(errorMessage);
      expect(() => throwGitHubError(error)).toThrow(
        new GitHubAPIError(errorMessage)
      );
    }
  });
});
