import { PromptBody } from '@/types/prompt';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

if (!API_BASE_URL) {
  console.error('Error: VITE_API_BASE_URL is not defined in the environment variables.');
}

export const postGeminiRequest = async (prompt: PromptBody) => {
  const { role, context, task, output, constraints, language, score } = prompt;

  const res = await fetch(`${API_BASE_URL}/prompt/generate`, {
    method: 'POST',
    body: JSON.stringify({ role, context, task, output, constraints, language, score }),
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Oh no. Prompt Gemini Fail lol.');

  const data = await res.json();
  return data;
};
