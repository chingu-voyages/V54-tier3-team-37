import { cn } from '@/lib/utils';

const Container = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn(`mx-auto flex w-full max-w-6xl flex-col items-center px-4`, className)}>
      {children}
    </div>
  );
};

export default Container;
