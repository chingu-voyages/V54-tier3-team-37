import {Router, RequestHandler} from "express";

import {userController} from "../controllers/index.js";


export const userRoute: Router = Router({});

userRoute.get("/:userId", userController.getUserProfile as RequestHandler);




