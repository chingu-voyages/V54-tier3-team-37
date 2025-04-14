import { useCallback, useEffect } from 'react';

import { CheckCircle, Copy, Plus, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deletePrompt, getPromptHistory } from '@/store/slices/promptSlice';
import { formatDateTime } from '@/utils/formatDate';

import DeleteDialog from './common/DeletePromptDialog';
import Star from './icons/StartIcon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';

const PromptHistory = () => {
  const dispatch = useAppDispatch();
  const { promptHistory, loading, error } = useAppSelector((state) => state.prompts);

  useEffect(() => {
    dispatch(getPromptHistory());
  }, [dispatch]);

  if (loading === 'pending') {
    return <div className="py-16 text-center text-muted-foreground">Loading prompts...</div>;
  }

  if (error) {
    return <div className="py-16 text-center text-red-500">Error: {error}</div>;
  }

  const handleCopy = (prompt) => {
    if (prompt) {
      navigator.clipboard.writeText(prompt.geminiText);
      toast.success('Prompt copied to clipboard!', {
        icon: <CheckCircle className="text-green-600" />,
      });
    }
  };

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
          {promptHistory.map((prompt, index) => {
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
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Star
                            width={16}
                            height={16}
                            color={i < prompt.score ? '#FDD902' : '#9CA3AF'}
                          />
                        </div>
                      ))}
                    </div>

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

                <AccordionContent className="px-6 pb-6 text-base leading-relaxed text-muted-foreground">
                  <div className="space-y-2">
                    {promptDetails.map(([label, value]) => (
                      <p key={label}>
                        <strong className="text-foreground">{label}:</strong> {value}
                      </p>
                    ))}
                  </div>

                  <div className="mt-6">
                    <p className="mb-2 font-semibold text-foreground">Prompto Result:</p>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      “{prompt.geminiText ? prompt.geminiText.replace(/\n/g, ' ').trim() : ''}”
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <div className="mt-12 text-center text-muted-foreground">
          You don’t have any saved prompts yet.
        </div>
      )}
    </div>
  );
};

export default PromptHistory;
