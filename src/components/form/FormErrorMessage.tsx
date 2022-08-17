import { FieldError } from 'react-hook-form';

interface FormErrorMessageProps {
  error?: FieldError | null;
}

export function FormErrorMessage({ error }: FormErrorMessageProps) {
  if (error) {
    return <span className="mt-1 text-xs text-red-500">{error.message}</span>;
  }

  return null;
}
