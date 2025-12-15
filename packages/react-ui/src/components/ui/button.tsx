import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Shortcut } from './shortcut';
import { LoadingSpinner } from './spinner';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold tracking-tight transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-sm",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[0_12px_40px_-20px_hsl(var(--primary))] border border-primary/40 enabled:hover:bg-primary/90 enabled:active:translate-y-[1px]',
        basic:
          'text-primary font-medium underline-offset-4 enabled:hover:bg-accent',
        secondary:
          'text-secondary-foreground bg-secondary/80 border border-border enabled:hover:bg-secondary',
        destructive:
          'bg-destructive text-background enabled:hover:bg-destructive/90',
        outline:
          'border-primary/40 bg-background/40 text-foreground enabled:hover:bg-accent enabled:hover:text-accent-foreground border',
        accent: 'bg-accent text-accent-foreground border border-accent/50 enabled:hover:bg-accent/80',
        ghost:
          'hover:bg-accent/40 hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        transparent: 'text-primary enabled:hover:bg-transparent',
        'outline-primary':
          'text-primary font-medium border border-primary/30 enabled:hover:bg-primary/10 enabled:hover:border-primary enabled:hover:font-semibold',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        xs: 'h-6 px-2 text-xs py-2',
      },
    },
    compoundVariants: [
      {
        variant: 'link',
        class: 'px-0',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  keyboardShortcut?: string;
  onKeyboardShortcut?: () => void;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      keyboardShortcut,
      disabled,
      onKeyboardShortcut,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    const isMac = /(Mac)/i.test(navigator.userAgent);
    const isEscape = keyboardShortcut?.toLocaleLowerCase() === 'esc';
    React.useEffect(() => {
      if (keyboardShortcut) {
        document.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [keyboardShortcut, disabled]);

    const handleKeyDown = (event: KeyboardEvent) => {
      const isEscapePressed = event.key === 'Escape' && isEscape;
      const isCtrlWithShortcut =
        keyboardShortcut &&
        event.key === keyboardShortcut.toLocaleLowerCase() &&
        (isMac ? event.metaKey : event.ctrlKey);
      if (isEscapePressed || isCtrlWithShortcut) {
        event.preventDefault();
        event.stopPropagation();
        if (onKeyboardShortcut && !disabled) {
          onKeyboardShortcut();
        }
      }
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), {})}
        ref={ref}
        disabled={disabled || loading}
        {...props}
        onClick={(e) => {
          loading ? e.stopPropagation() : props.onClick && props.onClick(e);
        }}
      >
        {loading ? (
          <LoadingSpinner
            className={cn('size-5', {
              'stroke-background':
                variant === 'default' || variant === 'secondary',
              'stroke-foreground':
                variant !== 'default' && variant !== 'secondary',
            })}
          />
        ) : (
          <>
            {keyboardShortcut && (
              <div className="flex justify-center items-center gap-2">
                {children}
                <Shortcut shortcutKey={keyboardShortcut} withCtrl={true} />
              </div>
            )}
            {!keyboardShortcut && children}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
