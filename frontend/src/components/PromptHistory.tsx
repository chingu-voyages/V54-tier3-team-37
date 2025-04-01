import {
  useEffect,
  useState,
} from 'react';

import {
  Plus,
  Triangle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const PromptHistory = () => {
  const [promptList, setPromptList] = useState([]);

  useEffect(() => {
    const epicPromptListSetterOmg = () => {
      setPromptList([])
    }
    epicPromptListSetterOmg();
  }, [])

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
        {promptList.length > 0 &&
          <Button size="lg">
            <Link
              to="../generate"
              className="flex items-center justify-between gap-2"
            >
              <Plus /> Generate New Prompt
            </Link>
          </Button>
        }
      </div>
      {promptList.length < 1 &&
        <div className="flex flex-col gap-16 items-center">
          <div className="flex flex-col gap-8 items-center">
            <div className="size-48 bg-muted-foreground rounded-full"></div>
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
      }
    </div>
  );
};

export default PromptHistory;
