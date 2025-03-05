import { KeyRound } from 'lucide-react';
import { GenFrom } from '@/components/gen-form';
import { ModeToggle } from './components/mode-toggle';

export default function GenPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
            <KeyRound className="size-4" />
          </div>
          Password Generator
          <ModeToggle />
        </a>

        <GenFrom className="mb-10" />
      </div>
    </div>
  );
}
