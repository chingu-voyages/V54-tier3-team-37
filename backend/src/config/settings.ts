import express from "express";
import path from "path";
import session from "express-session";
import { userRoute, authRoute } from "../routes/index.js";

export const configApp = () => {
  const app = express();

  // Serve static files
  const __dirname = import.meta.dirname;
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
