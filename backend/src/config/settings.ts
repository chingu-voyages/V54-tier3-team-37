import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import {authRoute, promptRoute, userRoute} from "../routes/index.js";
import cors from "cors";
import {setupSwagger} from "../swagger.js";

export const configApp = () => {
    const app = express();
    app.use(express.json());

    setupSwagger(app);
    const allowedOrigins = process.env.HOME_REACT_ADDRESS?.split(',') || ['http://localhost:5173'];

    app.use(cookieParser());
    app.use(
        cors({
            origin: allowedOrigins,
            credentials: true,
        })
    );

    // Serve static files
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "..", "static")));

    const sessionSecret = String(process.env.SESSION_SECRET);
    app.use(
        session({secret: sessionSecret, resave: false, saveUninitialized: true})
    );
    app.use(express.json());

    app.use("/", authRoute);
    app.use("/users", userRoute);
    app.use("/prompts", promptRoute);

    return app;
};
