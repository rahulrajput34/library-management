'use client';

import { Input } from '@/components/ui/input';
import React from 'react';

type Props = {
  label: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  defaultValue?: string | number;
  placeholder?: string;
};

export default function DetailInput({
  label,
  name,
  type = 'text',
  defaultValue,
  placeholder,
}: Props) {
  return (
    <div className="flex flex-col">
      <span className="mb-2 text-xs uppercase tracking-wide text-gray-300">
        {label}
      </span>
      <Input
        name={name}
        type={type}
        defaultValue={defaultValue as string}
        placeholder={placeholder}
        className="bg-gray-900/40 text-white ring-1 ring-white/10
                   focus:ring-2 focus:ring-emerald-400/60"
      />
    </div>
  );
}
