'use client';

import { Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAppDispatch } from '@/store/hooks';
import { sendPromptToGemini } from '@/store/slices/promptSlice';
import { LanguageSelect } from '@/types/prompt';
import { pentagramFields } from '@/utils/pentagramField';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const formSchema = z.object({
  role: z.string().trim().min(1, { message: 'A defined role is required' }),
  task: z.string().trim().min(1, { message: 'A clear task is required' }),
  context: z.string().trim().min(1, { message: 'Background context is required' }),
  output: z.string().trim().min(1, { message: 'A specified output is required' }),
  constraints: z.string().trim().min(1, { message: 'Constraints and limits are required' }),
  language: z.string().default('EN'),
});

type FormValues = z.infer<typeof formSchema>;

type PromptGenFormProps = {
  setFormValues: (values: FormValues) => void;
  setIsLoading: (loading: boolean) => void;
  setIsGenerated: (generated: boolean) => void;
  isLoading: boolean;
  isGenerated: boolean;
};

const PromptGenForm = ({
  setFormValues,
  setIsLoading,
  setIsGenerated,
  isLoading,
  isGenerated,
}: PromptGenFormProps) => {
  const dispatch = useAppDispatch();

  const languageSelect: LanguageSelect = {
    name: 'language',
    label: 'Language',
    type: 'select',
    options: [
      { value: 'EN', text: 'English' },
      { value: 'ES', text: 'Spanish' },
      { value: 'FR', text: 'French' },
    ],
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
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
    setFormValues(values);
    const payload = {
      ...values,
      score: 0,
      geminiText: null,
      geminiSummary: null,
    };

    try {
      await dispatch(sendPromptToGemini(payload)).unwrap();
      setIsGenerated(true);
    } catch (error) {
      console.error('Prompt generation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center gap-8"
      >
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center text-[24px] font-semibold tracking-wide text-prompto-primary">
              AI Prompt Generator Form
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8 pb-8 lg:grid-cols-2">
            {/* Role field */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        Role <span className="text-red-500">*</span>
                      </span>
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
                      className="h-24 resize-none max-sm:h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="absolute -bottom-6 left-0" />
                </FormItem>
              )}
            />

            {/* Language select */}
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="h-min text-lg">{languageSelect.label}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="size-full min-w-[180px] text-lg">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {languageSelect.options.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="h-16 text-lg focus:bg-[#E6E5FF]"
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

            {/* Other pentagram fields */}
            {pentagramFields.slice(1).map((fieldDef) => (
              <FormField
                key={fieldDef.name}
                control={form.control}
                name={fieldDef.name as keyof FormValues}
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="flex flex-col items-start">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {fieldDef.label} <span className="text-red-500">*</span>
                        </span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info size={16} />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{fieldDef.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={fieldDef.placeholder}
                        className="h-24 resize-none max-sm:h-32"
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
        <div className="flex w-full items-center justify-center gap-6 max-sm:flex-col">
          <Button
            type="button"
            variant="outline"
            className={`max-w-48 text-[20px] max-sm:w-full ${!form.formState.isDirty ? 'cursor-not-allowed border-[#AFAEB0] text-[#AFAEB0]' : 'text-prompto-primary'} `}
            onClick={() => {
              form.reset();
              setFormValues({
                role: '',
                context: '',
                task: '',
                output: '',
                constraints: '',
                language: 'EN',
              });
              setIsGenerated(false);
            }}
            disabled={!form.formState.isDirty}
          >
            Clear Form
          </Button>
          <Button
            type="submit"
            variant="primary"
            className={`max-w-48 text-[20px] max-sm:w-full ${!form.formState.isValid || isLoading ? 'cursor-not-allowed bg-[#AFAEB0] text-white' : 'text-white'} `}
            disabled={!form.formState.isValid || isLoading}
          >
            {isLoading ? 'Wait...' : isGenerated ? 'Regenerate' : 'Generate'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PromptGenForm;
