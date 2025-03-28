import { describe, expect, test, jest } from "@jest/globals";

import { generateToken } from "../../src/utils/index";
import { mockUsers } from "../../__mocks__/mockUsers";

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn().mockImplementation(() => "foo_bar"),
}));

describe("generateToken", () => {
  test("generates a JWT token", () => {
    mockUsers.validUser.forEach((user) => {
      const result = generateToken(user);
      expect(result).toBe("foo_bar");
    });
  });
  test("throws error with partial or missing credentials", () => {
    mockUsers.invalidUser.forEach((user) => {
      expect(() => generateToken(user)).toThrow("missing credentials");
    });
  });
});
