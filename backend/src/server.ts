import prisma from "./prisma.ts";
import { configApp } from "./config/settings.ts";

import dotenv from "dotenv";
// Enable access to environment variables for Prisma client
dotenv.config({ path: "./src/.env" });

const port = process.env.PORT || 3000;

export const app = configApp();

const startApp = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log("Connected to Database");

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting the app:", error);
    process.exit(1);
  }
};

startApp();
