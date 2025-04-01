'use client';

import { Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
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

const formSchema = z.object({
  role: z.string().trim().min(1, { message: 'A defined role is required' }),
  context: z.string().trim().min(1, { message: 'Background context is required' }),
  task: z.string().trim().min(1, { message: 'A clear task is required' }),
  output: z.string().trim().min(1, { message: 'A specified output is required' }),
  constraints: z.string().trim().min(1, { message: 'Constraints and limits are required' }),
  language: z.string().default('EN'),
});

type FormValues = z.infer<typeof formSchema>;

type PromptGenFormProps = {
  setGeneratedPrompt: (prompt: string | null) => void;
  setIsLoading: (loading: boolean) => void;
  setIsGenerated: (generated: boolean) => void;
  isLoading: boolean;
  isGenerated: boolean;
};

const PromptGenForm = ({
  setGeneratedPrompt,
  setIsLoading,
  setIsGenerated,
  isLoading,
  isGenerated,
}: PromptGenFormProps) => {
  const pentagramFields = [
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
      name: 'context',
      label: 'Context',
      type: 'textarea',
      placeholder:
        'E.g. We want to encourage people to make small changes in their daily lives to reduce their environmental impact.',
      tooltip: 'Provide background information to help the AI understand the task.',
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

  const languageSelect = {
    name: 'language',
    label: 'Language',
    type: 'select',
    options: [
      {
        value: 'EN',
        text: 'English',
      },
      {
        value: 'ES',
        text: 'Spanish',
      },
      {
        value: 'FR',
        text: 'French',
      },
    ],
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: '',
      context: '',
      task: '',
      output: '',
      constraints: '',
      language: 'EN',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setIsGenerated(false);

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1500));

    let prompt: string = '';
    switch (values.language) {
      case 'EN':
        prompt = `As a ${values.role}, create a compelling message related to ${values.context}.
              Your task is to ${values.task}, ensuring the output is ${values.output}. Please adhere to the following constraints: ${values.constraints}.`;
        break;
      case 'ES':
        prompt = `Como ${values.role}, crea un mensaje convincente relacionado con ${values.context}.
              Tu tarea es ${values.task}, asegurando que el resultado sea ${values.output}. Por favor, respeta las siguientes restricciones: ${values.constraints}.`;
        break;
      case 'FR':
        prompt = `En tant que ${values.role}, créez un message captivant lié à ${values.context}.
              Votre tâche est de ${values.task}, en veillant à ce que le résultat soit ${values.output}. Veuillez respecter les contraintes suivantes : ${values.constraints}.`;
        break;
      default:
        prompt = `As a ${values.role}, create a compelling message related to ${values.context}.
              Your task is to ${values.task}, ensuring the output is ${values.output}. Please adhere to the following constraints: ${values.constraints}.`;
    }

    setGeneratedPrompt(prompt);
    setIsLoading(false);
    setIsGenerated(true);
  };

  return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-16 w-full"
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-center text-2xl">AI Prompt Generator Form</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-8 pb-8">

              {/* 'Role' field is separated from others due to layout */}
              <FormField
                control={form.control}
                name={pentagramFields[0].name as keyof FormValues}
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="flex flex-col items-start">
                      <div className="flex items-center gap-2">
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
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={pentagramFields[0].placeholder}
                        className="h-24 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="absolute -bottom-6 left-0" />
                  </FormItem>
                )}
              />

              {/* 'Language' field is different input type */}
              <FormField
                control={form.control}
                name={languageSelect.name as keyof FormValues}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex flex-col items-start self-start">
                      <span className="text-lg">{languageSelect.label}</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="min-w-[180px] text-lg">
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                      </FormControl>
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rest of the the pentagram fields */}
              {pentagramFields.slice(1).map((pentagramField) => (
                <FormField
                  key={pentagramField.name}
                  control={form.control}
                  name={pentagramField.name as keyof FormValues}
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className="flex flex-col items-start">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{pentagramField.label}</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info size={16} />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{pentagramField.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={pentagramField.placeholder}
                          className="h-24 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="absolute -bottom-6 left-0" />
                    </FormItem>
                  )}
                />
              ))}
            </CardContent>
          </Card>
          <Button
            size="lg"
            className="cursor-pointer p-8 text-xl"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Wait...' : isGenerated ? 'Regenerate' : 'Generate'}
          </Button>
        </form>
      </Form>
  );
};

export default PromptGenForm;
