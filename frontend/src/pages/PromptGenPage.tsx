import { useState } from 'react';

import PromptGenForm from '@/components/PromptGenForm';
import PromptGenResult from '@/components/PromptGenResult';
import type { FormValues } from '@/types/prompt';

const PromptGenPage = () => {
  const [formValues, setFormValues] = useState<FormValues | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  return (
    <section className="flex w-full flex-col items-center justify-center gap-8 py-10 sm:px-4">
      <div className="space-y-4 text-center">
        <h1 className="text-[24px] font-semibold text-pretty text-prompto-accent">
          Create Effective Prompts for AI Systems with Our Intuitive Generator
        </h1>
        <p className="mx-auto text-[20px] text-pretty text-prompto-gray-medium sm:max-w-5/6">
          Fill in the details below to generate a clear, well-structured, and effective prompt
          tailored to your needs.
        </p>
      </div>
      <PromptGenForm
        setFormValues={setFormValues}
        setIsLoading={setIsLoading}
        setIsGenerated={setIsGenerated}
        isLoading={isLoading}
        isGenerated={isGenerated}
      />
      <PromptGenResult formValues={formValues} />
    </section>
  );
};

export default PromptGenPage;
