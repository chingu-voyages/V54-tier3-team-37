import { GitHubAPIError, throwGitHubError } from "../../src/services/errors";
import { errorMessages } from "../../__mocks__/mockErrorMessges";

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
