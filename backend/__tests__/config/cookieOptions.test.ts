import { prodOptions } from "../../__mocks__/cookieOptions";

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

  // test("sets correct options in development", async () => {
  //   process.env.NODE_ENV = devOptions.env;
  //   const { cookieOptions } = await import("../../src/config/cookieOptions");
  //   expect(cookieOptions.secure).toEqual(devOptions.secure);
  //   expect(cookieOptions.sameSite).toEqual(devOptions.sameSite);
  // });

  test("sets correct options in production environment", async () => {
    process.env.NODE_ENV = prodOptions.env;
    const { cookieOptions } = await import("../../src/config/cookieOptions");
    expect(cookieOptions.secure).toEqual(prodOptions.secure);
    expect(cookieOptions.sameSite).toEqual(prodOptions.sameSite);
  });
});
