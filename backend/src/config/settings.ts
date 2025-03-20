import express from "express";
import {userRoute} from "../routes/userRoutes.js";



export const configApp = () => {
    const app = express()

    app.use(express.json())

    app.use('/users', userRoute);

    return app;
}