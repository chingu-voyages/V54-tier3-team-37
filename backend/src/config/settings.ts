import express from "express";
import {userRoute} from "../routes/userRoutes.js";
import {promptRoute} from "../routes/promptRoutes.js";


export const configApp = () => {
    const app = express()

    app.use(express.json())

    app.use('/users', userRoute);
    app.use("/prompts", promptRoute);

    return app;
}