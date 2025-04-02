export interface SavePromptOutputInput {
    userId: string;
    promptId: string;
    content: string;
    metadata?: Record<string, any>;
    version?: number;
}
