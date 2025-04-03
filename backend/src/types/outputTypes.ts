export interface SavePromptOutputInput {
    userId: string;
    promptId: string;
    content: string;
    metadata?: Record<string, unknown>;
    version?: number;
}
