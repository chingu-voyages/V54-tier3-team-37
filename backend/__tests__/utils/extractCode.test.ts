import { describe, expect, test } from "@jest/globals";
import { extractCode } from "../../src/utils";

const params = [
  { state: "foo-bar", code: "hello-world" },
  { state: "SsCzLtWaTDyB79q3j2Yuk4", code: "wPmTNnMHrZ9dXS7FkRpsfL" },
  { state: "URa2N3QJWvd49AqLHtgTED", code: "b8puytEHCYW3F2AGSwQ6sX" },
];

describe("extractCode", () => {
  test("extracts code from a request", () => {
    for (const param of params) {
      const { state, code } = param;
      const mockRequest = {
        url: `/auth/github/callback?code=${code}&state=${state}`,
        headers: {
          authorization: "i-am-token",
        },
      };
      const result = extractCode(mockRequest, state);
      expect(result).toEqual(code);
    }
  });
  test("throws an error in case of request state mismatch", () => {
    for (const param of params) {
      const { state, code } = param;
      const mockRequest = {
        url: `/auth/github/callback?code=${code}&state=${state}`,
        headers: {
          authorization: "i-am-token",
        },
      };
      expect(() => extractCode(mockRequest, code)).toThrow();
    }
  });
  test("throws an error in case of invalid request", () => {
    for (const param of params) {
      const { state, code } = param;
      const mockRequest = {
        url: `/auth/github/callback?code=${code}&state=${state}`,
      };
      expect(() => extractCode(mockRequest, state)).toThrow();
    }
  });
  test("throws an error in case of missing query 'code' parameter", () => {
    for (const param of params) {
      const { state } = param;
      const mockRequest = {
        url: `/auth/github/callback?code=&state=${state}`,
        headers: {
          authorization: "i-am-token",
        },
      };
      expect(() => extractCode(mockRequest, state)).toThrow();
    }
  });

  test("throws an error in case of missing query 'state' parameter", () => {
    for (const param of params) {
      const { code } = param;
      const mockRequest = {
        url: `/auth/github/callback?code=${code}&state=;`,
        headers: {
          authorization: "i-am-token",
        },
      };
      expect(() => extractCode(mockRequest, code)).toThrow();
    }
  });
  test("throws an error in case of authentication error", () => {
    for (const param of params) {
      const { state, code } = param;
      const mockRequest = {
        url: `/auth/github/callback?code=${code}&state=${state}`,
        headers: {
          authorization: "i-am-token",
        },
      };
      expect(() => extractCode(mockRequest, code)).toThrow();
    }
  });
});
