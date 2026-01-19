import {Request, Response} from "express";


export const transcribePrompt = async (req: Request, res: Response) => {
    // This endpoint is currently unused as we use Chrome's native Speech Recognition API
    // on the frontend for client-side transcription
    res.status(501).json({error: 'This endpoint is not currently implemented'});
};
