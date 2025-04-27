import {Router} from "express";
import multer from 'multer';
import {audioController} from "../controllers/index.js";

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {fileSize: 20 * 1024 * 1024} // 20MB limit
});

export const audioRoute: Router = Router();

audioRoute.post("/transcribe", upload.single('audio'), audioController.transcribePrompt);

