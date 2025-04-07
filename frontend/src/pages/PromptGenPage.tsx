import { useState } from 'react';

import PromptGenForm from '@/components/PromptGenForm';
import PromptGenResult from '@/components/PromptGenResult';
import type { FormValues } from '@/types/prompt';

const PromptGenPage = () => {
  const [formValues, setFormValues] = useState<FormValues | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  return (
    <section className="flex w-full flex-col items-center justify-center gap-16 px-4 py-10">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl">
          Create Effective Prompts for AI Systems with Our Intuitive Generator
        </h1>
        <p>
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
