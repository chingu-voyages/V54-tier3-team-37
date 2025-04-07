import { useEffect } from 'react';
import { Edit, Plus, Star, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getPromptHistory } from '@/store/slices/promptSlice';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';
import { formatDateTime } from '@/utils/formatDate';

const PromptHistory = () => {
  const dispatch = useAppDispatch();
  const { promptHistory, loading, error } = useAppSelector((state) => state.prompts);

  useEffect(() => {
    dispatch(getPromptHistory());
  }, [dispatch]);

  if (loading === 'pending') {
    return <div className="text-muted-foreground text-center">Loading prompts...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex w-full flex-col gap-16 pb-16">
      <div className="flex items-center justify-end">
        <Button size="lg">
          <Link
            to="/generate"
            className="flex items-center gap-2"
          >
            <Plus /> Generate New Prompt
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
                className="rounded-xl border bg-white shadow-sm"
              >
                <div className="flex w-full items-start justify-between px-6 py-4">
                  <div className="flex max-w-[70%] flex-col gap-1">
                    <h3 className="text-xl font-semibold break-words">
                      {prompt.geminiSummary || 'Untitled Prompt'}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Created on: <strong>{formatDateTime(prompt.createdAt)}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < prompt.score ? 'text-yellow-500' : 'text-muted-foreground'}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ))}
                    </div>

                    <Trash
                      size={18}
                      className="text-muted-foreground hover:text-destructive cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Handle delete
                      }}
                    />
                    <Edit
                      size={18}
                      className="text-muted-foreground hover:text-primary cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Handle edit
                      }}
                    />

                    <AccordionTrigger
                      className="!m-0 w-5 !p-0"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>

                <AccordionContent className="text-muted-foreground px-6 pb-6 text-base leading-relaxed">
                  <div className="space-y-2">
                    {promptDetails.map(([label, value]) => (
                      <p key={label}>
                        <strong className="text-foreground">{label}:</strong> {value}
                      </p>
                    ))}
                  </div>

                  <div className="mt-6">
                    <p className="text-foreground mb-2 font-semibold">Prompto Result:</p>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      “{prompt.geminiText ? prompt.geminiText.replace(/\n/g, ' ').trim() : ''}”
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <div className="text-muted-foreground mt-12 text-center">
          You don’t have any saved prompts yet.
        </div>
      )}
    </div>
  );
};

export default PromptHistory;
