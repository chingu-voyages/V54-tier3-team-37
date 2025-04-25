import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';
import { Slot } from '@radix-ui/react-slot';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer rounded-lg active:scale-95 transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-[#727173] active:bg-[#383636] hover:bg-[#AFAEB0] text-white focus-visible:border-white focus-visible:ring-white/50',
        primary:
          'bg-prompto-primary active:bg-[#5A068E] hover:bg-[#A13EDF] text-white focus-visible:border-white focus-visible:ring-white/50',
        secondary:
          'bg-prompto-secondary active:bg-[#0075C6] hover:bg-[#40B2FF] text-white focus-visible:border-white focus-visible:ring-white/50',
        ghost:
          'bg-transparent active:bg-[#AEA7FF] hover:bg-[#E6E5FF] text-prompto-gray-dark focus-visible:border-white focus-visible:ring-white/50',
        outline:
          'bg-transparent active:bg-[#AEA7FF] hover:bg-[#E6E5FF] text-prompto-primary inset-ring-3 inset-ring-prompto-primary border-prompto-primary focus-visible:border-white focus-visible:ring-white/50',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-5 py-3 text-button has-[>svg]:px-3',
        lg: 'px-6 py-4 text-h5 has-[>svg]:px-4',
        icon: 'p-3 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
