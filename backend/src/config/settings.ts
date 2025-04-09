import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";

import { corsOptions, securityHeaders } from "../middleware/index.js";
import { authRoute, promptRoute, userRoute } from "../routes/index.js";

export const configApp = async () => {
  const app = express();
  app.set("trust proxy", 1);
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
    session({
      name: "sid",
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 10,
      },
    })
  );

  app.use("/", authRoute);
  app.use("/users", userRoute);
  app.use("/prompts", promptRoute);

  return app;
};
