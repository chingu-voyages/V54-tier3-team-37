import { Router } from "express";
import { generateGeminiResponse } from "../services/geminiService.js"; // adjust path if needed

const promptRoute: Router = Router();

promptRoute.post('/gemini-test', async (req, res) => {
    try {
        const { prompt } = req.body;

        const result = await generateGeminiResponse(prompt);

        res.status(200).json({ result });
    } catch (err) {
        console.error('Gemini Error:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

export { promptRoute };
