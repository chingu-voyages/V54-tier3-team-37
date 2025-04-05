export type PromptInput = {
    role: string;
    context: string;
    task: string;
    output: string;
    constraints: string;
    language: 'EN' | 'ES' | 'FR';
    score?: number;
    geminiText?: string;
    geminiSummary?: string;
};

export type GeminiResponseType = {
    text: string;
    summary: string;
}
