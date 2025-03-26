import {RequestHandler, Router} from "express";

import {userController} from "../controllers/index.js";


export const userRoute: Router = Router({});

// GET /users/:userId → Fetch user profile by ID
userRoute.get("/:userId", userController.getUserProfile as RequestHandler);




