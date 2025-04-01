import {
  useEffect,
  useState,
} from 'react';

import {
  Edit,
  Plus,
  Star,
  Trash,
  Triangle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { PromptResponse } from '@/types/prompt';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const PromptHistory = () => {
  // We will fix the type once we are clearer on what it is
  const [promptList, setPromptList] = useState<PromptResponse[]>([]);

  useEffect(() => {
    const mockPrompt: PromptResponse = {
      role: 'Developer',
      context: 'A new feature request',
      task: 'Write unit tests',
      output: 'Jest test cases',
      constraints: 'Use mocking',
      language: 'EN',
      apiResponse:
        'You are a developer handling a new feature request. You have been assigned a task to write unit tests with Jest, and your lead has asked you to write Jest test cases with mocking. Please provide some test cases for the following component. Provide them one at a time in your response. Add extensive comments to each. Please note that there may be further issues related to my use of ESM rather than CJS.',
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      createdAt: '2025-04-01T09:50:50.766Z',
      score: 0,
      isBookmarked: false,
    };
    const epicPromptListSetterOmg = () => {
      setPromptList([mockPrompt]);
    };
    epicPromptListSetterOmg();
  }, []);

  return (
    <div className="flex w-full flex-col gap-16 pb-16">
      <div className="flex items-center justify-between gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-muted flex items-center justify-between gap-2 rounded-md border px-4 py-1">
            Sort By{' '}
            <Triangle
              size={12}
              className="rotate-180"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Date</DropdownMenuItem>
            <DropdownMenuItem>Rating</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {promptList.length && (
          <Button size="lg">
            <Link
              to="../generate"
              className="flex items-center justify-between gap-2"
            >
              <Plus /> Generate New Prompt
            </Link>
          </Button>
        )}
      </div>
      {promptList.length ? (
        <Accordion
          type="single"
          collapsible
          className="space-y-8"
        >
          {/* Remember to unspread this when we get the real data */}
          {[...promptList, ...promptList, ...promptList].map((prompt, index) => {
            const sentences = prompt.apiResponse.split('. ');
            return (
              <Card className="bg-muted pt-0">
                <CardContent>
                  <AccordionItem value={`${index}`}>
                    <AccordionTrigger>{`${sentences[0]}. `}</AccordionTrigger>
                    <AccordionContent>{sentences.slice(1).join('. ')}</AccordionContent>
                  </AccordionItem>
                </CardContent>
                <CardFooter className="flex items-center justify-between gap-4">
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
                      variant="ghost"
                      onClick={() => {
                        // handle delete
                      }}
                      className="cursor-pointer"
                    >
                      <Trash size={16} />
                      Delete
                    </Button>
                    <Button
                      size="lg"
                      variant="ghost"
                      onClick={() => {
                        // handle edit
                      }}
                      className="cursor-pointer"
                    >
                      <Edit size={16} />
                      Edit
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </Accordion>
      ) : (
        <div className="flex flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-8">
            <div className="bg-muted-foreground size-48 rounded-full"></div>
            <p className="text-muted-foreground">You don't have any saved prompts to review.</p>
          </div>
          <Button size="lg">
            <Link
              to="../generate"
              className="flex items-center justify-between gap-2"
            >
              <Plus /> Generate New Prompt
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default PromptHistory;
