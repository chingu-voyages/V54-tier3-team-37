import env from "../src/env";

type Options = {
  env: typeof env.NODE_ENV;
  secure: boolean;
  sameSite: string;
};

export const devOptions: Options = {
  env: "development",
  secure: false,
  sameSite: "lax",
};

export const prodOptions: Options = {
  env: "production",
  secure: true,
  sameSite: "none",
};
