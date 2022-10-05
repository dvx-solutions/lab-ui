import { FieldError } from 'react-hook-form';

interface FormErrorMessageProps {
  error?: FieldError | null;
  className?: string;
}

export function FormErrorMessage({
  error,
  className = '',
}: FormErrorMessageProps) {
  if (error) {
    return (
      <span className={`"mt-1 text-red-500" text-xs ${className}`}>
        {error.message}
      </span>
    );
  }

  return null;
}
