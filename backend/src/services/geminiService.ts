import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const generateGeminiResponse = async (promptText: string): Promise<string> => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{ text: promptText }],
                },
            ],
        });

        return result.response.text();
    } catch (error) {
        console.error("Gemini Error:", error);
        throw error;
    }
};
