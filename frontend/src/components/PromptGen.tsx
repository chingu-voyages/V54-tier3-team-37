import { Info } from 'lucide-react';

import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export const PromptGenForm = () => {
  const pentagramFields = [
    {
      label: 'Role',
      type: 'textarea',
      placeholder:
        'E.g. You are a friendly and enthusiastic social media influencer who promotes eco-friendly living.',
      tooltip: 'Define the role or identity for the AI. This guides the tone and style.',
      required: true,
    },
    {
      label: 'Context',
      type: 'textarea',
      placeholder:
        'E.g. We want to encourage people to make small changes in their daily lives to reduce their environmental impact.',
      tooltip: 'Provide background information to help the AI understand the task.',
      required: true,
    },
    {
      label: 'Task',
      type: 'textarea',
      placeholder:
        'E.g. Write a short social media post that inspires people to adopt one simple sustainable habit.',
      tooltip: 'Clearly state what action you want the AI to take.',
      required: true,
    },
    {
      label: 'Output',
      type: 'textarea',
      placeholder:
        'E.g. The post should be concise, positive, and include a call to action. It should be suitable for platforms like Instagram or Twitter.',
      tooltip: "Specify the desired format, style, and tone of the AI tool's response.",
      required: true,
    },
    {
      label: 'Constraints',
      type: 'textarea',
      placeholder:
        'E.g. Avoid using overly technical jargon. Keep the message positive and avoid any negative or guilt-inducing language.',
      tooltip: 'Set any limitations or restrictions for the AI to follow.',
      required: true,
    },
  ];

  const languageSelect = {
    label: 'Language',
    type: 'select',
    options: [
      {
        value: 'english',
        text: 'English',
      },
      {
        value: 'spanish',
        text: 'Spanish',
      },
      {
        value: 'french',
        text: 'French',
      },
    ],
  };

  return (
    <div className="flex w-full flex-col items-center gap-16">
      <Card className="w-full">
        <CardContent>
          <h3 className="mb-8 text-center text-2xl">AI Prompt Generator Form</h3>
          <div className="grid grid-cols-2 gap-8">
            <Label className="flex flex-col items-start">
              <div className="flex items-start gap-2">
                <span className="text-lg">{pentagramFields[0].label}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info size={16} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{pentagramFields[0].tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                placeholder={pentagramFields[0].placeholder}
                className="h-24 resize-none"
              />
            </Label>
            <Label className="flex flex-col items-start self-start">
              <span className="text-lg">{languageSelect.label}</span>
              <Select>
                <SelectTrigger className="min-w-[180px] text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {languageSelect.options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="text-lg"
                      >
                        {option.text}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Label>
            {pentagramFields.slice(1).map((field) => (
              <Label
                key={field.label}
                className="flex flex-col items-start"
              >
                <div className="flex items-start gap-2">
                  <span className="text-lg">{field.label}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info size={16} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{field.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Textarea
                  placeholder={field.placeholder}
                  className="h-24 resize-none"
                />
              </Label>
            ))}
          </div>
        </CardContent>
      </Card>
      <Button
        size="lg"
        className="cursor-pointer p-8 text-xl"
      >
        Generate
      </Button>
    </div>
  );
};

export const PromptGenResult = () => {
  return (
    <Card className="text-center w-full">
      <CardHeader>
        <CardTitle>Generated Prompt</CardTitle>
      </CardHeader>
      <CardContent className="min-h-32 flex items-center justify-center">Your generated prompts will appear here</CardContent>
    </Card>
  );
};
