import { CookieOptions } from "express";

import { isProduction } from "./isProduction.js";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  // Isolate cookies and other site data - preventing cross-site tracking
  partitioned: isProduction, // for privacy-focused browsers, requires 'secure'
  domain: isProduction ? ".netlify.app" : "localhost", // lock the domain explicitly
  path: "/", // for cross-route access
  priority: "high",
};
