import { useEffect, useState } from 'react';

import { HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/cn';

import Star from './icons/StartIcon';

interface StarRatingProps {
  currentScore: number;
  isSaved: boolean;
  onRate: (newScore: number) => void;
}

const StarRating = ({ currentScore, isSaved, onRate }: StarRatingProps) => {
  const [hoverScore, setHoverScore] = useState<number | null>(null);
  const [displayScore, setDisplayScore] = useState<number>(currentScore);
  useEffect(() => {
    setDisplayScore(currentScore);
  }, [currentScore]);

  const handleStarClick = (index: number) => {
    if (!isSaved) {
      toast.error('Please save the prompt before rating it.', {
        icon: <HelpCircle className="text-red-600" />,
      });
      return;
    }
    const newScore = index + 1;
    setDisplayScore(newScore);
    onRate(newScore);
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        const isFilled = hoverScore !== null ? i < hoverScore : isSaved && i < displayScore;

        return (
          <div
            key={i}
            title={
              !isSaved ? 'Save the prompt before rating' : `Rate ${i + 1} star${i > 0 ? 's' : ''}`
            }
            onMouseEnter={() => isSaved && setHoverScore(i + 1)}
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
  );
};

export default StarRating;
