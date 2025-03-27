import {Router} from "express";

import {userController} from "../controllers/index.js";
import {authMiddleware} from "../middleware/authMiddleware.js";


export const userRoute: Router = Router({});

// Route to retrieve a user profile by userId (email)
userRoute.get("/:userId", authMiddleware, userController.getUserProfile as any);




