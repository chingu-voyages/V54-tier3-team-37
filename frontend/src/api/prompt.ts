import { PromptBody } from '@/types/prompt';
import type { PromptResponse } from '@/types/prompt';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.error('Error: VITE_API_BASE_URL is not defined in the environment variables.');
}

export const postGeminiRequest = async (prompt: PromptBody) => {
  const res = await fetch(`${API_BASE_URL}/prompts/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(prompt),
  });

  if (!res.ok) throw new Error('Failed to send prompt to Gemini');

  return await res.json();
};

export const savePrompt = async (
  prompt: PromptBody & {
    geminiText: string;
    geminiSummary: string;
  }
) => {
  const res = await fetch(`${API_BASE_URL}/prompts/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(prompt),
  });

  if (!res.ok) throw new Error('Failed to save prompt.');

  return await res.json();
};

export const fetchPrompts = async (): Promise<PromptResponse[]> => {
  const res = await fetch(`${API_BASE_URL}/prompts`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch prompts');
  }

  const data = await res.json();
  return data;
};
