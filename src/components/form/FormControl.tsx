import { ReactNode } from 'react';

interface FormControlProps {
  children: ReactNode;
}

export function FormControl({ children }: FormControlProps) {
  return (
    <div className="flex w-full flex-col items-start justify-start">
      {children}
    </div>
  );
}
