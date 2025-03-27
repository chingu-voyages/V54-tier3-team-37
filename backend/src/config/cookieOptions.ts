import { CookieOptions } from "express";

import { isProduction } from "./settings.js";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
};
