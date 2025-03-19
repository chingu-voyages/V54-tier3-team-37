import { cn } from '@/lib/utils';

const Container = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn(`max-w-6xl px-4 flex flex-col items-center mx-auto`, className)}>{children}</div>;
};

export default Container;
