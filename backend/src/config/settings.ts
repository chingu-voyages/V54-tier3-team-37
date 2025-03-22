import express from "express";
import session from "express-session";
import { userRoute, authRoute } from "../routes/index.ts";

export const configApp = () => {
  const app = express();

  const sessionSecret = String(process.env.SESSION_SECRET);
  app.use(
    session({ secret: sessionSecret, resave: false, saveUninitialized: true })
  );
  app.use(express.json());

  app.use("/", authRoute);
  app.use("/users", userRoute);

  return app;
};
