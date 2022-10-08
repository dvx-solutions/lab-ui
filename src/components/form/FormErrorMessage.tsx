import { FieldError } from 'react-hook-form';

import { classNames } from '+/lib';

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
      <span className={classNames(`mt-1 text-xs text-red-500`, className)}>
        {error.message}
      </span>
    );
  }

  return null;
}
