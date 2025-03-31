import {
  PromptGenForm,
  PromptGenResult,
} from '@/components/PromptGen';

const PromptGenPage = () => {
  return (
    <section className="flex flex-col gap-16 w-full items-center justify-center px-4 py-10">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl">Create Effective Prompts for AI Systems with Our Intuitive Generator</h1>
        <p>Fill in the details below to generate a clear, well-structured, and effective prompt tailored to your needs.</p>
      </div>
      <PromptGenForm />
      <PromptGenResult />
    </section>
  );
};

export default PromptGenPage;
