import { CookieOptions } from "express";

import { HOME_REACT_ADDRESS } from "./reactRedirectAddress.js";
import { isProduction } from "./isProduction.js";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  // Isolate cookies and other site data - preventing cross-site tracking
  partitioned: isProduction, // for privacy-focused browsers, requires 'secure'
  domain: new URL(HOME_REACT_ADDRESS).hostname, 
  path: "/", // for cross-route access
  priority: "high",
};
