import express from "express";
import { userRoute, promptRoute } from "../routes/index.ts";

export const configApp = () => {
  const app = express();

  app.use(express.json());

  app.use("/users", userRoute);
  app.use("/prompts", promptRoute);

  return app;
};
