import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import { userRoute, authRoute } from "../routes/index.js";
import cors from "cors";

export const configApp = () => {
  const app = express();

  app.use(cookieParser());
  app.use(
    cors({
      origin: ["http://localhost:5173"],
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
