import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";

import { corsOptions, securityHeaders, authMiddleware } from "../middleware/index.js";
import { authRoute, promptRoute, userRoute } from "../routes/index.js";

export const configApp = async () => {
  const app = express();
  app.use(express.json());

  if (process.env.NODE_ENV !== "test") {
    const { setupSwagger } = await import("../swagger.js");
    setupSwagger(app);
  }

  app.use(cookieParser());
  app.use(securityHeaders); // Security headers for privacy-focused browsers
  app.use(cors(corsOptions));

  // Serve static files
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "..", "static")));

  const sessionSecret = String(process.env.SESSION_SECRET);
  app.use(
    session({ secret: sessionSecret, resave: false, saveUninitialized: true })
  );

  app.use("/", authRoute);
  app.use("/users", authMiddleware, userRoute);
  app.use("/prompts", authMiddleware, promptRoute);

  return app;
};
