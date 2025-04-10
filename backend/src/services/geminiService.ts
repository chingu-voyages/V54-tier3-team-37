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

        const text = stripMarkdown(result.response.text());

        const summaryResult = await model.generateContent({
            contents: [{
                role: "user",
                parts: [{
                    text: `
                    You are a smart assistant. Based on the following:
                    
                    You are a smart assistant. Based on the interaction below, summarize it in no more than 35 words. 
                    Avoid using phrases like "the user" or "AI." Write a brief, neutral description of the request and response.
                    
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

/**
 * Strips Markdown formatting from the given text.
 *
 * @param {string} text - The text to strip Markdown from.
 * @returns {string} - The text without Markdown formatting.
 */
function stripMarkdown(text: string): string {
    return text
        .replace(/\\n/g, '\n') // Convert escaped newlines to actual newlines
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
        .replace(/\*(.*?)\*/g, '$1') // Remove italic markdown
        .replace(/`(.*?)`/g, '$1') // Remove inline code markdown
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert Markdown links
        .replace(/^\s*[\*\-+]\s+/gm, '• ') // Normalize list bullets
        .replace(/\n{2,}/g, '\n\n') // Normalize spacing
        .trim();
}
