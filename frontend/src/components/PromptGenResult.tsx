import { useCallback, useState } from 'react';

import { CheckCircle, Copy, HelpCircle, Save } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/cn';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  savePromptToDatabase,
  updatePromptScore,
  updatePromptScoreOnServer,
} from '@/store/slices/promptSlice';
import type { FormValues, PromptResponse } from '@/types/prompt';

import Star from './icons/StartIcon';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

type PromptGenResultProps = {
  formValues: FormValues | null;
};

const PromptGenResult = ({ formValues }: PromptGenResultProps) => {
  const dispatch = useAppDispatch();
  const { output } = useAppSelector((state) => state.prompts) as { output: PromptResponse | null };

  const [hoverScore, setHoverScore] = useState<number | null>(null);

  const handleCopy = useCallback(() => {
    if (output?.geminiText) {
      navigator.clipboard.writeText(output.geminiText);
      toast.success('Prompt copied to clipboard!', {
        icon: <CheckCircle className="text-green-600" />,
      });
    }
  }, [output]);

  const handleSave = async () => {
    if (!output || !formValues || !output.geminiText || !output.geminiSummary) return;

    const payload = {
      ...formValues,
      score: output.score,
      geminiText: output.geminiText,
      geminiSummary: output.geminiSummary,
    };

    const toastId = toast.loading('Saving prompt...');

    try {
      await dispatch(savePromptToDatabase(payload)).unwrap();
      toast.success('Prompt saved successfully!', {
        id: toastId,
        icon: <CheckCircle className="text-green-600" />,
      });
    } catch (err) {
      toast.error('Failed to save prompt.', {
        id: toastId,
        icon: <HelpCircle className="text-red-600" />,
        description: typeof err === 'string' ? err : 'Something went wrong. Please try again.',
      });
    }
  };

  const handleStarClick = (index: number) => {
    if (!output) return;

    const newScore = index + 1;

    if (!output.id) {
      toast.error('Please save the prompt before rating it.', {
        icon: <HelpCircle className="text-red-600" />,
      });
      return;
    }

    dispatch(updatePromptScore(newScore));

    dispatch(updatePromptScoreOnServer({ promptId: output.id, score: newScore }))
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

  return (
    <Card className={cn('w-full text-center', output ? 'bg-[#F2F1FF]' : 'bg-white')}>
      <CardHeader>
        <CardTitle className="pt-4 text-[24px] font-semibold text-prompto-accent">
          Generated Prompt
        </CardTitle>
      </CardHeader>
      <CardContent className="flex min-h-32 flex-col items-center gap-4 px-16 py-4">
        {output ? (
          <p
            className={cn(
              'whitespace-pre-line',
              output?.geminiText &&
                'w-full rounded-lg bg-white p-6 text-start text-pretty text-prompto-gray-dark'
            )}
          >
            {output?.geminiText
              ? `“${output?.geminiText}”`
              : 'Your generated prompts will appear here'}
          </p>
        ) : (
          <>
            <img src="/jetpack-man.png" />
            <p className="pb-4 text-prompto-gray-dark">Your generated prompt will appear here.</p>
          </>
        )}
      </CardContent>
      {output?.geminiText && (
        <CardFooter className="flex items-center justify-between gap-4 px-16">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => {
              const isSaved = Boolean(output?.id);
              const isFilled = hoverScore !== null ? i < hoverScore : isSaved && i < output.score;

              return (
                <div
                  key={i}
                  title={!isSaved ? 'Save the prompt before rating' : ''}
                  onMouseEnter={() => setHoverScore(i + 1)}
                  onMouseLeave={() => setHoverScore(null)}
                  onClick={() => handleStarClick(i)}
                  className={cn(
                    'transition-all',
                    isSaved ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'
                  )}
                >
                  <Star
                    width={24}
                    height={24}
                    color={isFilled ? '#FDD902' : '#9CA3AF'}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleSave}
              variant="outline"
              className="min-w-32 text-[20px] text-prompto-primary hover:bg-prompto-primary hover:text-white active:bg-accent"
            >
              <Save size={16} />
              Save
            </Button>
            <Button
              onClick={handleCopy}
              variant="primary"
              className="min-w-32 bg-prompto-accent text-[20px] text-white inset-ring-prompto-accent"
            >
              <Copy size={16} />
              Copy
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default PromptGenResult;
