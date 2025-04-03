import {GoogleGenerativeAI} from "@google/generative-ai";

// Initialize Gemini AI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * Generates a text response from the Gemini AI model based on the provided prompt.
 *
 * - Uses the `gemini-2.0-flash` model for fast, low-latency generation
 * - Sends the prompt as a user message to the model
 * - Returns the generated AI response as plain text
 *
 * @param promptText - The formatted prompt to send to the AI
 * @returns The AI-generated response as a string
 * @throws Error if the model fails to generate content
 */
export const generateGeminiResponse = async (promptText: string): Promise<string> => {
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

        return result.response.text();
    } catch (error) {
        console.error("Gemini Error:", error);
        throw error;
    }
};
