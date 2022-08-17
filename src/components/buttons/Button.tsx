import { ButtonHTMLAttributes, ReactNode } from 'react';
import { FiLoader } from 'react-icons/fi';

import { convertClassnames } from '+/lib/convertClassnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  children,
  className = '',
  isDisabled,
  isLoading,
  leftIcon,
  rightIcon,
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
      {isLoading ? (
        <FiLoader className="animate-spin" />
      ) : (
        <>
          {leftIcon && <span>{leftIcon}</span>}
          {children}
          {rightIcon && <span>{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
