import {Request, Response} from "express";
import {generateGeminiAudioResponse} from "../services/geminiService.js";


export const transcribePrompt = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
           res.status(400).json({error: 'No audio file provided'});
           return;
        }

        const result = await generateGeminiAudioResponse({
            audioBuffer: req.file.buffer,
            mimeType: req.file.mimetype
        });

        res.json(result);
    } catch (error) {
        console.error('Audio transcription error:', error);
        res.status(500).json({error: 'Failed to transcribe audio'});
    }
};