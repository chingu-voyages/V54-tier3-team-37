import { useCallback } from 'react';
import { Copy, Save, Star } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { savePromptToDatabase } from '@/store/slices/promptSlice';
import type { FormValues, PromptResponse } from '@/types/prompt';

type PromptGenResultProps = {
  formValues: FormValues | null;
};

const PromptGenResult = ({ formValues }: PromptGenResultProps) => {
  const dispatch = useAppDispatch();
  const { output } = useAppSelector((state) => state.prompts) as { output: PromptResponse | null };

  const handleCopy = useCallback(() => {
    if (output?.geminiText) {
      navigator.clipboard.writeText(output.geminiText);
    }
  }, [output]);

  const handleSave = () => {
    if (!output || !formValues || !output.geminiText || !output.geminiSummary) return;

    const payload = {
      ...formValues,
      score: output.score,
      geminiText: output.geminiText,
      geminiSummary: output.geminiSummary,
    };

    dispatch(savePromptToDatabase(payload));
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
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                role="img"
                aria-label="Star"
                className={i < output.score ? 'text-yellow-500' : 'text-muted-foreground'}
              />
            ))}
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
