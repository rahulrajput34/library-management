'use client';

import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

export default function SaveButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending || disabled}
      className="flex w-full items-center justify-center
                 bg-emerald-500 font-semibold text-white hover:bg-emerald-600"
    >
      {pending ? 'Saving…' : 'Save changes'}
    </Button>
  );
}
