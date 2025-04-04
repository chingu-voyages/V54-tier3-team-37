import {GoogleGenerativeAI} from "@google/generative-ai";
import {GeminiResponseType} from "../types/promptTypes.js";

// Initialize Gemini AI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);


export const generateGeminiResponse = async (promptText: string): Promise<GeminiResponseType> => {
    try {
        const model = genAI.getGenerativeModel({model: "gemini-2.0-flash"});

        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{text: promptText}],
                },
            ],
        });

        const text = result.response.text();
        const summary = text.slice(0, 50);

        return {text, summary};
    } catch (error) {
        console.error("Gemini Error:", error);
        throw error;
    }
};
