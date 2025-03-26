import express from "express";
import path from "path";
import session from "express-session";
import { userRoute, authRoute } from "../routes/index.js";
import cors from "cors";

export const configApp = () => {
  const app = express();

  const allowedOrigins = [process.env.CLIENT_URL || "http://localhost:5173"];

  app.use(
      cors({
        origin: allowedOrigins,
        credentials: true,
      })
  );

  // Serve static files
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "..", "static")));

  const sessionSecret = String(process.env.SESSION_SECRET);
  app.use(
    session({ secret: sessionSecret, resave: false, saveUninitialized: true })
  );
  app.use(express.json());

  app.use("/", authRoute);
  app.use("/users", userRoute);

  return app;
};
