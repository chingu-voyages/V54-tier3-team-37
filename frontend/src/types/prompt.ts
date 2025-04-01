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
