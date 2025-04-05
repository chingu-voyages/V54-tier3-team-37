import {GoogleGenerativeAI} from "@google/generative-ai";
import {GeminiResponseType} from "../types/promptTypes.js";

// Initialize Gemini AI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * Generates a response from the Gemini AI model based on the provided prompt text.
 *
 * @param {string} promptText - The text prompt to send to the Gemini AI model.
 * @returns {Promise<GeminiResponseType>} - A promise that resolves to an object containing the generated text and its summary.
 */
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

        const text = result.response.text().trim();

        const summaryResult = await model.generateContent({
            contents: [{
                role: "user",
                parts: [{
                    text: `
                    You are a smart assistant. Based on the following:
                    
                    Summarize the following interaction in 1–2 sentences without using phrases like "The user" or "AI." 
                    Write it like a short neutral description of what was requested and delivered.
                    
                    Prompt:
                    ${promptText}
                    
                    Response:
                    ${text}
                    `.trim()
                }],
            }],
        });

        const summary = summaryResult.response.text().trim();

        return {text, summary};
    } catch (error) {
        console.error("Gemini Error:", error);
        throw error;
    }
};
