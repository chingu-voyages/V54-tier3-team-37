import { useEffect } from 'react';

import { CheckCircle, Copy, HelpCircle, Plus, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  deletePrompt,
  getPromptHistory,
  updatePromptScoreOnServer,
} from '@/store/slices/promptSlice';
import { PromptResponse } from '@/types/prompt';
import { formatDateTime } from '@/utils/formatDate';

import DeleteDialog from './common/DeletePromptDialog';
import StarRating from './StarRating';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';

const PromptHistory = () => {
  const dispatch = useAppDispatch();
  const { promptHistory, loading, error } = useAppSelector((state) => state.prompts);

  useEffect(() => {
    dispatch(getPromptHistory());
  }, [dispatch]);

  const handleCopy = (prompt: PromptResponse) => {
    if (prompt) {
      navigator.clipboard.writeText(prompt?.geminiText || '');
      toast.success('Prompt copied to clipboard!', {
        icon: <CheckCircle className="text-green-600" />,
      });
    }
  };

  const handleStarRate = (promptId: string, newScore: number) => {
    dispatch(updatePromptScoreOnServer({ promptId: promptId, score: newScore }))
      .unwrap()
      .then(() => {
        toast.success('Rating saved!', {
          icon: <CheckCircle className="text-green-600" />,
        });
      })
      .catch((err) => {
        toast.error('Failed to save rating.', {
          icon: <HelpCircle className="text-red-600" />,
          description: typeof err === 'string' ? err : 'Try again later.',
        });
      });
  };

  if (loading === 'pending') {
    return <div className="py-16 text-center text-muted-foreground">Loading prompts...</div>;
  }

  if (error) {
    return <div className="py-16 text-center text-red-500">Error: {error}</div>;
  }

  // const noPromptTest = true;
  // if (noPromptTest) {
  //   return (
  //     <div className="flex flex-col items-center gap-8 pt-32">
  //       <img src="/paper-exclamation.png" />
  //       <p className="text-[20px] text-prompto-gray-dark">
  //         You don't have any saved prompts to review
  //       </p>
  //       <Button variant="primary">
  //         <Link
  //           to="/dashboard/generate"
  //           className="flex items-center gap-2 text-white"
  //         >
  //           <Plus /> Create New Prompt
  //         </Link>
  //       </Button>
  //     </div>
  //   );
  // }

  return (
    <div className="flex w-full flex-col gap-16 py-16">
      <div className="flex items-center justify-end">
        <Button variant="primary">
          <Link
            to="/dashboard/generate"
            className="flex items-center gap-2 text-white"
          >
            <Plus /> Create Prompt
          </Link>
        </Button>
      </div>

      {promptHistory.length > 0 ? (
        <Accordion
          type="multiple"
          className="space-y-4"
        >
          {promptHistory.map((prompt) => {
            const promptDetails = [
              ['Role', prompt.role],
              ['Task', prompt.task],
              ['Context', prompt.context],
              ['Output', prompt.output],
              ['Constraints', prompt.constraints],
            ];

            return (
              <AccordionItem
                key={prompt.id}
                value={prompt.id}
                className="relative rounded-xl border bg-white pb-6 shadow-sm"
              >
                <div className="flex w-full items-start justify-between px-6 py-4 pb-6">
                  <div className="flex max-w-[70%] flex-col gap-6">
                    <h3 className="text-lg break-words">
                      {prompt.geminiSummary || 'Untitled Prompt'}
                    </h3>
                    <p className="text-sm text-prompto-gray-medium">
                      Created on: {formatDateTime(prompt.createdAt)}
                    </p>
                  </div>

                  <div className="relative flex h-full items-center gap-4">
                    <StarRating
                      currentScore={prompt.score}
                      isSaved={true}
                      onRate={(newScore) => handleStarRate(prompt.id, newScore)}
                    />

                    <DeleteDialog
                      onConfirm={() => dispatch(deletePrompt(prompt.id))}
                      title="Are you sure you want to delete this prompt?"
                      description="This action cannot be undone. The prompt will be permanently removed from your history."
                      trigger={
                        <Trash
                          size={18}
                          className="cursor-pointer text-muted-foreground hover:text-destructive"
                          onClick={(e) => e.stopPropagation()}
                        />
                      }
                    />
                    <button
                      onClick={() => handleCopy(prompt)}
                      className="cursor-pointer"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
                <AccordionTrigger
                  className="absolute right-4 bottom-4 !m-0 w-5 cursor-pointer !p-0"
                  onClick={(e) => e.stopPropagation()}
                />

                <AccordionContent className="flex flex-col gap-6 px-6 py-6 text-base leading-relaxed text-muted-foreground">
                  <div className="space-y-2">
                    {promptDetails.map(([label, value]) => (
                      <p
                        key={label}
                        className="flex gap-3"
                      >
                        <span className="min-w-32 font-semibold">{label}:</span> {value}
                      </p>
                    ))}
                  </div>

                  <div className="mt-6">
                    <p className="mb-2 font-semibold">Prompto Result:</p>
                    <p className="pr-6 text-base leading-relaxed">
                      “{prompt.geminiText ? prompt.geminiText.replace(/\n/g, ' ').trim() : ''}”
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <div className="flex flex-col items-center gap-8 pt-32">
          <img src="/paper-exclamation.png" />
          <p className="text-[20px] text-prompto-gray-dark">
            You don't have any saved prompts to review
          </p>
          <Button variant="primary">
            <Link
              to="/dashboard/generate"
              className="flex items-center gap-2 text-white"
            >
              <Plus /> Create New Prompt
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default PromptHistory;
