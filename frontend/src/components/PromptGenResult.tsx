import { useCallback } from 'react';

import {
  Copy,
  Save,
  Star,
} from 'lucide-react';

import { cn } from '@/lib/cn';

import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

type PromptGenResultProps = {
  generatedPrompt: string | null;
  // setGeneratedPrompt: (prompt: string | null) => void;
};

const PromptGenResult = ({
  generatedPrompt,
  // setGeneratedPrompt,
}: PromptGenResultProps) => {
  const handleCopy = useCallback(() => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt);
    }
  }, [generatedPrompt]);

  const handleSave = () => {
    // Placeholder for save functionality
    alert('Save functionality not implemented yet!');
  };

  return (
    <Card className={cn("w-full text-center", generatedPrompt && "bg-muted")}>
      <CardHeader>
        <CardTitle className="text-2xl">Generated Prompt</CardTitle>
      </CardHeader>
      <CardContent className="min-h-32 px-16 py-8">
        <p className="whitespace-pre-line text-start text-pretty bg-background p-4 border-muted-foreground border rounded-lg">
          {generatedPrompt || 'Your generated prompts will appear here'}
        </p>
      </CardContent>
      {generatedPrompt && (
        <CardFooter className="flex justify-between gap-4 items-center">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className="text-yellow-500"
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
