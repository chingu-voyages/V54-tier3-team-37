import { CookieOptions } from "express";

import { isProduction } from "./isProduction.js";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
};
