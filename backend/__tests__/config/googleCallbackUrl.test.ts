import {
  GOOGLE_CALLBACK_URL_DEV,
  GOOGLE_CALLBACK_URL_PROD,
} from "../../src/config/authConfig";

describe("Google callback URL", () => {
  const appEnv = process.env;

  beforeEach(() => {
    // Reset modules cache before each test
    jest.resetModules();
    process.env = { ...appEnv };
  });

  afterAll(() => {
    // Set app environment to the original value
    process.env = appEnv;
  });

  test("uses development Google callback URL in development environment", async () => {
    process.env.NODE_ENV = "development";
    const { GOOGLE_CALLBACK_URL } = await import("../../src/config/authConfig");
    expect(GOOGLE_CALLBACK_URL).toEqual(GOOGLE_CALLBACK_URL_DEV);
  });

  test("uses development Google callback URL in undefined environment", async () => {
    process.env.NODE_ENV = "";
    const { GOOGLE_CALLBACK_URL } = await import("../../src/config/authConfig");
    expect(GOOGLE_CALLBACK_URL).toEqual(GOOGLE_CALLBACK_URL_DEV);
  });

  test("uses production Google callback URL in production environment", async () => {
    process.env.NODE_ENV = "production";
    const { GOOGLE_CALLBACK_URL } = await import("../../src/config/authConfig");
    expect(GOOGLE_CALLBACK_URL).toEqual(GOOGLE_CALLBACK_URL_PROD);
  });
});
