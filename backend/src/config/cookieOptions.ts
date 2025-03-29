import { CookieOptions } from "express";

import { isProduction } from "./authConfig.js";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
};
