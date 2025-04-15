import { PentagramField } from '@/types/prompt';

export const pentagramFields: PentagramField[] = [
  {
    name: 'role',
    label: 'Role',
    type: 'textarea',
    placeholder:
      'E.g. You are a friendly and enthusiastic social media influencer who promotes eco-friendly living.',
    tooltip: 'Define the role or identity for the AI. This guides the tone and style.',
    required: true,
  },
  {
    name: 'task',
    label: 'Task',
    type: 'textarea',
    placeholder:
      'E.g. Write a short social media post that inspires people to adopt one simple sustainable habit.',
    tooltip: 'Clearly state what action you want the AI to take.',
    required: true,
  },
  {
    name: 'context',
    label: 'Context',
    type: 'textarea',
    placeholder:
      'E.g. We want to encourage people to make small changes in their daily lives to reduce their environmental impact.',
    tooltip: 'Provide background information to help the AI understand the task.',
    required: true,
  },
  {
    name: 'output',
    label: 'Output',
    type: 'textarea',
    placeholder:
      'E.g. The post should be concise, positive, and include a call to action. It should be suitable for platforms like Instagram or Twitter.',
    tooltip: "Specify the desired format, style, and tone of the AI tool's response.",
    required: true,
  },
  {
    name: 'constraints',
    label: 'Constraints',
    type: 'textarea',
    placeholder:
      'E.g. Avoid using overly technical jargon. Keep the message positive and avoid any negative or guilt-inducing language.',
    tooltip: 'Set any limitations or restrictions for the AI to follow.',
    required: true,
  },
];
