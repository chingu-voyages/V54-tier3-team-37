import { useCallback, useState } from 'react';
import { CheckCircle, Copy, HelpCircle, Save } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  savePromptToDatabase,
  updatePromptScore,
  updatePromptScoreOnServer,
} from '@/store/slices/promptSlice';

import type { FormValues, PromptResponse } from '@/types/prompt';
import { toast } from 'sonner';
import Star from './icons/StartIcon';

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
    <Card className={cn('w-full text-center', output && 'bg-muted')}>
      <CardHeader>
        <CardTitle className="text-2xl">Generated Prompt</CardTitle>
      </CardHeader>
      <CardContent className="min-h-32 px-16 py-8">
        <p
          className={cn(
            'whitespace-pre-line',
            output?.geminiText &&
              'bg-background border-muted-foreground rounded-lg border p-4 text-start text-pretty'
          )}
        >
          {output?.geminiText || 'Your generated prompts will appear here'}
        </p>
      </CardContent>
      {output?.geminiText && (
        <CardFooter className="flex items-center justify-between gap-4">
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
              size="lg"
              onClick={handleCopy}
              className="cursor-pointer"
            >
              <Copy size={16} />
              Copy
            </Button>
            <Button
              size="lg"
              onClick={handleSave}
              className="cursor-pointer"
            >
              <Save size={16} />
              Save
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default PromptGenResult;
