import { CookieOptions } from "express";

import { isProduction } from "./isProduction.js";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  domain: isProduction ? "v54-tier3-team-37.onrender.com" : undefined,
  // Isolate cookies and other site data - preventing cross-site tracking
  partitioned: isProduction, // for privacy-focused browsers, requires 'secure'
  path: "/", // for cross-route access
  priority: "high",
};
