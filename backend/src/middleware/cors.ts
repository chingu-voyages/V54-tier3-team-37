import { NextFunction, Request, Response } from "express";

const allowedOrigins = process.env.HOME_REACT_ADDRESS?.split(",");

export const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
  allowedHeaders: ["Content-Type", "Cookie", "Set-Cookie", "Authorization"],
  exposedHeaders: ["Set-Cookie", "Authorization"],
};

export const securityHeaders = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Allow cross-origin access to resources
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  // Limit tracking data leakage
  res.header("Referrer-Policy", "strict-origin-when-cross-origin");
  // Reduces cookie blocking in Chromium-based privacy browsers
  res.header("Permissions-Policy", "interest-cohort=()");
  // Restricts all resource loading to same-origin by default
  res.header("Content-Security-Policy", "default-src 'self'");
  // Disables MIME type sniffing
  res.header("X-Content-Type-Options", "nosniff");
  // Prevent a web page from being displayed in a frame or iframe, regardless of the origin
  res.header("X-Frame-Options", "deny");
  next();
};
