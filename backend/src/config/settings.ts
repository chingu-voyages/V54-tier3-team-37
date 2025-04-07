import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";

import { securityHeaders } from "../middleware/index.js";
import { authRoute, promptRoute, userRoute } from "../routes/index.js";

export const configApp = async () => {
  const app = express();
  app.use(express.json());

  if (process.env.NODE_ENV !== "test") {
    const { setupSwagger } = await import("../swagger.js");
    setupSwagger(app);
  }

  const allowedOrigins = process.env.HOME_REACT_ADDRESS?.split(",");

  app.use(cookieParser());
  app.use(securityHeaders); // Security headers for privacy-focused browsers

  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Cookie", "Set-Cookie"],
      exposedHeaders: ["Set-Cookie"],
    })
  );

  // Serve static files
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "..", "static")));

  const sessionSecret = String(process.env.SESSION_SECRET);
  app.use(
    session({ secret: sessionSecret, resave: false, saveUninitialized: true })
  );

  app.use("/", authRoute);
  app.use("/users", userRoute);
  app.use("/prompts", promptRoute);

  return app;
};
