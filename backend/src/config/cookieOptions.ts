import { CookieOptions } from "express";

import { isProduction } from "./authConfig.ts";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
};
