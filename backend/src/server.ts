import prisma from "./prisma.js";
import "dotenv/config.js";

import {configApp} from "./config/index.js";

const port = process.env.PORT || 4000;

export const app = configApp();

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
};

startApp();
