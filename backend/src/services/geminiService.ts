import {GoogleGenerativeAI} from "@google/generative-ai";
import {GeminiResponseType} from "../types/promptTypes.js";
import {AudioRequest} from "../types/audioTypes.js";

// Initialize Gemini AI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * List of Gemini AI model versions to attempt in order of preference.
 *
 * The system will try each model sequentially until a successful response is received,
 * starting with the fastest and latest versions and falling back to older or alternative models if necessary.
 *
 * This ordering is designed to maximize reliability and performance.
 */
const MODEL_VERSIONS = [
    "gemini-2.0-flash",
    "gemini-2.0-flash-001",
    "gemini-2.0-flash-lite",
    "gemini-1.5-flash",
    "gemini-1.5-flash-8b",
    "gemini-1.5-pro",
];

/**
 * Attempts to generate content from Gemini AI by trying multiple model versions in order.
 *
 * Iterates through the predefined list of model versions, sending the provided prompt to each model.
 * If a model responds successfully, returns the stripped (plain text) result.
 * If a model fails with a 500 or 503 error, automatically retries with the next model.
 * Throws a fatal error immediately for other types of failures, or if all models fail.
 *
 * @param {any} prompt - The prompt payload to send to the AI model.
 * @returns {Promise<string>} - The generated plain text content.
 * @throws {Error} - Throws if all models fail or a non-retryable error occurs.
 */
async function tryGenerateContent(
    prompt: any,
): Promise<string> {
    for (const modelVersion of MODEL_VERSIONS) {
        try {
            const model = genAI.getGenerativeModel({ model: modelVersion });
            const result = await model.generateContent({ contents: [prompt] });
            return stripMarkdown(result.response.text());
        } catch (error: any) {
            if (error?.status === 500 || error?.status === 503) {
                console.warn(`Model ${modelVersion} failed with status ${error.status}. Trying next...`);
                continue;
            }
            console.error(`Gemini Fatal Error [${modelVersion}]:`, error);
            throw error;
        }
    }
    throw new Error("All Gemini models failed.");
}


/**
 * Generates a detailed AI response and a concise summary based on a given prompt text.
 *
 * Constructs two prompts:
 * - One to generate a full response from Gemini AI.
 * - Another to request a summarized version of the interaction in no more than 35 words,
 *   avoiding references to "user" or "AI."
 *
 * Sends both prompts through the model retry mechanism to ensure robustness against failures.
 *
 * @param {string} promptText - The input text used to generate the AI response.
 * @returns {Promise<GeminiResponseType>} - An object containing both the generated text and its summary.
 * @throws {Error} - Throws if all model versions fail for either the full response or the summary.
 */
export const generateGeminiResponse = async (promptText: string): Promise<GeminiResponseType> => {
    const prompt = {
        role: "user",
        parts: [{ text: promptText }],
    };

    const text = await tryGenerateContent(prompt);

    const summaryPrompt = {
        role: "user",
        parts: [{
            text: `
        You are a smart assistant. Based on the interaction below, summarize it in no more than 35 words. 
        Avoid using phrases like "the user" or "AI." Write a brief, neutral description of the request and response.

        Prompt:
        ${promptText}

        Response:
        ${text}
      `.trim(),
        }],
    };

    const summary = await tryGenerateContent(summaryPrompt);

    return { text, summary };
};

/**
 * Generates a transcript from the provided audio input using the Gemini AI model.
 *
 * Converts the audio buffer to a base64-encoded string, builds a prompt requesting a transcription,
 * and attempts to generate a transcript by sending the prompt to Gemini AI.
 * Automatically retries across multiple model versions if initial attempts fail.
 *
 * @param {AudioRequest} param0 - An object containing the audio buffer and its MIME type.
 * @returns {Promise<string>} - The generated transcript as plain text.
 * @throws {Error} - Throws an error if all model attempts fail.
 */
export const generateGeminiAudioResponse = async (
    {audioBuffer, mimeType}: AudioRequest
): Promise<string> => {
    const base64Audio = audioBuffer.toString('base64');

    const audioPrompt = {
        role: "user",
        parts: [
            { text: "Generate a transcript of this audio:" },
            {
                inlineData: {
                    data: base64Audio,
                    mimeType,
                },
            },
        ],
    };

    return await tryGenerateContent(audioPrompt);
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
        .replace(/^\s*[*\-+]\s+/gm, '• ') // Replace markdown bullets with a bullet point
        .replace(/\n{2,}/g, '\n\n') // Normalize spacing
        .trim(); // Remove leading/trailing whitespace
}



