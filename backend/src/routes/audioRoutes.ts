import {Router} from "express";
import {audioController} from "../controllers/index.js";

export const audioRoute: Router = Router();

audioRoute.post("/transcribe", audioController.transcribePrompt);
