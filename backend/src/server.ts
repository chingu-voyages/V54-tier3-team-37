import {configApp} from "./config/settings.js";
import prisma from "./prisma.js";

const port = process.env.PORT || 3000;

export const app = configApp()
console.log("index.ts")


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
}

startApp();