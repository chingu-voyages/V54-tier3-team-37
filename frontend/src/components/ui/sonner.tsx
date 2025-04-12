import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      position="bottom-right"
      duration={3000}
      closeButton
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      toastOptions={{
        unstyled: false,
        classNames: {
          toast:
            'group toast shadow-lg border bg-background text-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out slide-in-from-bottom-4 fade-in duration-300',
          title: 'font-semibold text-base',
          description: 'text-sm text-muted-foreground',
          actionButton: 'bg-primary text-white hover:bg-primary/90',
          cancelButton: 'bg-muted text-muted-foreground hover:bg-accent',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
