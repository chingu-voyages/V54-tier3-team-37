import {configApp} from "./config/settings.js";
import prisma from "./prisma.js";

import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 4000;

export const app = configApp()

const startApp = async (): Promise<void> => {
    try {
        await prisma.$connect();

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    } catch (error) {
        console.error("Error starting the app:", error);
        process.exit(1);
    }
}

startApp();