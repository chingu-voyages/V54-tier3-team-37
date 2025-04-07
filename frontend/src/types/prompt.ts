export type PentagramField = {
  name: 'role' | 'context' | 'task' | 'output' | 'constraints';
  label: 'Role' | 'Context' | 'Task' | 'Output' | 'Constraints';
  type: 'textarea';
  placeholder: string;
  tooltip: string;
  required: boolean;
};

export type LanguageSelect = {
  name: 'language';
  label: 'Language';
  type: 'select';
  options: LanguageOption[];
};

export type LanguageOption = {
  value: 'EN' | 'ES' | 'FR';
  text: 'English' | 'Spanish' | 'French';
};

export type PromptBody = {
  role: string;
  context: string;
  task: string;
  output: string;
  constraints: string;
  language: string;
  score: number;
  geminiText: string | null;
  geminiSummary: string | null;
};

export type PromptResponse = {
  role: string;
  context: string;
  task: string;
  output: string;
  constraints: string;
  language: string;
  geminiText: string | null;
  geminiSummary: string | null;
  id: string;
  userId: string;
  createdAt: string;
  score: number;
  isBookmarked: boolean;
};

export type FormValues = Omit<PromptBody, 'score' | 'geminiText' | 'geminiSummary'>;
