describe("React redirect address", () => {
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

  test("sets correct url in development", async () => {
    process.env.NODE_ENV = "development";
    const { HOME_REACT_ADDRESS } = await import(
      "../../src/config/reactRedirectAddress"
    );
    expect(HOME_REACT_ADDRESS).toContain("localhost");
  });

  test("sets correct development url in undefined environment", async () => {
    process.env.NODE_ENV = "";
    const { HOME_REACT_ADDRESS } = await import(
      "../../src/config/reactRedirectAddress"
    );
    expect(HOME_REACT_ADDRESS).toContain("localhost");
  });

  test("sets correct url in production", async () => {
    process.env.NODE_ENV = "production";
    const { HOME_REACT_ADDRESS } = await import(
      "../../src/config/reactRedirectAddress"
    );
    expect(HOME_REACT_ADDRESS).toContain("netlify");
  });
});
