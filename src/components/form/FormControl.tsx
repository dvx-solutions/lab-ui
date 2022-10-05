import { ReactNode } from 'react';

interface FormControlProps {
  children: ReactNode;
  className?: string;
}

export function FormControl({ children, className = '' }: FormControlProps) {
  return (
    <div
      className={`${className} ${className} flex w-full flex-col items-start justify-start`}
    >
      {children}
    </div>
  );
}
