import { describe, expect, test } from "@jest/globals";
import { generateRandomHexString } from "../../src/utils";

// Expected length of randomBytes(32).toString("hex"):
// 32 bytes × 2 characters per byte = 64 characters
const RANDOM_STRING_LENGTH = 64;

describe("generateRandomHexString", () => {
  test("generates a string", () => {
    expect(typeof generateRandomHexString()).toBe("string");
  });

  test(`generates a string of ${RANDOM_STRING_LENGTH} chars`, () => {
    const result = generateRandomHexString();
    expect(result.length).toEqual(RANDOM_STRING_LENGTH);
  });

  test("generates a valid hexadecimal string", () => {
    const result = generateRandomHexString();
    expect(result).toMatch(/^[0-9a-f]+$/);
  });

  test("generates a unique string", () => {
    const results = new Set();
    for (let i = 0; i < 10; i++) {
      results.add(generateRandomHexString());
    }
    expect(results.size).toEqual(10);
  });
});
