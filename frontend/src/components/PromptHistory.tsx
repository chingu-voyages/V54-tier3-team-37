import { useEffect } from 'react';

import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getPromptHistory } from '@/store/slices/promptSlice';

import PromptAccordion from './PromptAccordion';
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

  return promptHistory.length ? (
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
      <PromptAccordion promptHistory={promptHistory} />
    </div>
  ) : (
    <div className="flex flex-col items-center gap-8 pt-32">
      <img src="/paper-exclamation.png" />
      <p className="text-center text-[20px] text-pretty text-prompto-gray-dark">
        You don't have any saved prompts to review.
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
  );
};
export default PromptHistory;
