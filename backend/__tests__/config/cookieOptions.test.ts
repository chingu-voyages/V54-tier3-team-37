describe("cookieOptions", () => {
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

  test("sets secure to false in development", async () => {
    process.env.NODE_ENV = "development";
    const { cookieOptions } = await import("../../src/config/cookieOptions");
    expect(cookieOptions.secure).toEqual(false);
  });

  test("sets secure to false in undefined environment", async () => {
    process.env.NODE_ENV = "";
    const { cookieOptions } = await import("../../src/config/cookieOptions");
    expect(cookieOptions.secure).toEqual(false);
  });

  test("sets secure to true in production environment", async () => {
    process.env.NODE_ENV = "production";
    const { cookieOptions } = await import("../../src/config/cookieOptions");
    expect(cookieOptions.secure).toEqual(true);
  });
});
