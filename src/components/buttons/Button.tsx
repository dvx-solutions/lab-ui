import { ButtonHTMLAttributes } from 'react';
import { FiLoader } from 'react-icons/fi';

import { convertClassnames } from '+/lib/convertClassnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
  isLoading?: boolean;
}

export function Button({
  children,
  className = '',
  isDisabled,
  isLoading,
  ...props
}: ButtonProps) {
  return (
    <button
      className={convertClassnames(['button', className])}
      data-loading={isLoading}
      disabled={isDisabled || isLoading}
      type="button"
      {...props}
    >
      {isLoading ? <FiLoader className="animate-spin" /> : children}
    </button>
  );
}
