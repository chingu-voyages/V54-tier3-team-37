import { GoogleAPIError, throwGoogleError } from "../../src/services/index.ts";
import { errorMessages } from "../../__mocks__/mockErrorMessges.ts";

describe("throwGitHubError", () => {
  test("throws GitHubAPIError with provided message", () => {
    for (const errorMessage in errorMessages) {
      const error = new Error(errorMessage);
      expect(() => throwGoogleError(error)).toThrow(
        new GoogleAPIError(errorMessage)
      );
    }
  });
});
