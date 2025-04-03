import "dotenv/config.js";
import env from "./env.js";
import prisma from "./prisma.js";


import {configApp} from "./config/index.js";

const port = env.PORT || 4000;


const startApp = async (): Promise<void> => {
    try {

        const app = await configApp();
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
