import { Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const CommandCenterHero = () => {
  return (
    <div className="mb-6">
      <div className="rounded-3xl border border-primary/25 bg-gradient-to-br from-primary-300/10 via-background to-primary/10 p-6 shadow-[0_20px_80px_-60px_hsl(var(--primary))]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              <Sparkles className="size-4" />
              OPAX Ops
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Command your operations from one interface
            </h2>
            <p className="text-sm text-muted-foreground">
              OPAX centers every move around intent. Describe what you need, then refine it in the builder without losing control.
            </p>
          </div>

          <div className="w-full rounded-2xl border border-primary/25 bg-secondary/40 p-4 backdrop-blur md:max-w-md">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              New intent
            </p>
            <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center">
              <Input
                placeholder="Describe what you want to do"
                className="h-12 border-primary/30 bg-background/70 text-foreground shadow-sm"
                readOnly
              />
              <Button
                variant="outline"
                className="h-12 w-full border-primary/40 text-primary md:w-auto"
                disabled
              >
                Coming soon
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Your prompt becomes an operation blueprint. You can still open nodes and fine-tune every step.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
