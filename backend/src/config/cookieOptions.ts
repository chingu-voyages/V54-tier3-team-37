import { CookieOptions } from "express";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  // Isolate cookies and other site data - preventing cross-site tracking
  path: "/", // for cross-route access
  priority: "high",
};
