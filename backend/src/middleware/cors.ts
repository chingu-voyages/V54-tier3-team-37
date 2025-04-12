import { CorsOptions } from "cors";
import { NextFunction, Request, Response } from "express";

const allowedOrigins = [
  "http://localhost:5173",
  "https://prompto37.netlify.app",
];

export const corsOptions: CorsOptions = {
  // Handle origins dynamically
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowedOrigins?.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origin restricted by CORS"));
    }
  },
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
  // Restricts all resource loading to same-origin by default
  res.header("Content-Security-Policy", "default-src 'self'");
  // Disables MIME type sniffing
  res.header("X-Content-Type-Options", "nosniff");
  // Prevent a web page from being displayed in a frame or iframe, regardless of the origin
  res.header("X-Frame-Options", "deny");
  next();
};
