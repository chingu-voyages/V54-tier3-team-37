import jwt from "jsonwebtoken";
import { decode, tokenIsVerified } from "../../src/utils/verifyJWT";
import { mockUsers } from "../../__mocks__/mockUsers";
import { JWT_SECRET, getSignedTestJWT } from "../getSignedTestJWT";

// Do not print errors to console
jest.spyOn(console, "error").mockImplementation(() => {});

jest.mock("../../src/controllers/authController", () => ({
  githubSignIn: jest.fn((req, res) => res.sendStatus(200)),
  githubCallback: jest.fn((req, res) => res.sendStatus(200)),
}));

describe("Decode and isTokenVerified functions", () => {
  beforeAll(() => {
    process.env.JWT_SECRET = JWT_SECRET;
  });

  describe("decode function", () => {
    test("decodes valid token", () => {
      const validMockUsers = mockUsers.validUser;
      for (const mockUser of validMockUsers) {
        const testToken = getSignedTestJWT(mockUser);
        const result = decode(testToken);
        expect(result).toHaveProperty("sub", mockUser.id);
      }
    });

    test("returns undefined for invalid token", () => {
      const result = decode("invalid.JWT.secret");
      expect(result).toBeUndefined();
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("tokenIsVerified function", () => {
    test("returns true for unexpired token", () => {
      const expireInOneHour = Math.floor(Date.now() / 1000) + 3600;
      const payload = {
        exp: expireInOneHour,
      };
      expect(tokenIsVerified(payload as jwt.JwtPayload)).toBe(true);
    });

    test("returns false for expired token", () => {
      const expiredOneHourAgo = Math.floor(Date.now() / 1000) - 3600;
      const payload = {
        exp: expiredOneHourAgo,
      };
      expect(tokenIsVerified(payload as jwt.JwtPayload)).toBe(false);
    });
  });
});
