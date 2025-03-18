import express from "express";
// import { userRoute } from "../routes/userRoutes.ts";
// import { promptRoute } from "../routes/promptRoutes.ts";

export const configApp = () => {
  const app = express();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Hello, world!");
  });

  //   app.use("/users", userRoute);
  //   app.use("/prompts", promptRoute);

  return app;
};
