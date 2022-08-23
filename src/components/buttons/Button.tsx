import { ButtonHTMLAttributes, ReactNode } from 'react';
import { FiLoader } from 'react-icons/fi';

import { convertClassnames } from '+/lib/convertClassnames';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  loadingText?: string;
  rightIcon?: ReactNode;
}

export function Button({
  children,
  className = '',
  isDisabled,
  isLoading,
  leftIcon,
  loadingText,
  rightIcon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={convertClassnames([
        'button',
        isLoading ? 'button-loading' : '',
        className,
      ])}
      disabled={isDisabled || props.disabled}
      type="button"
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <FiLoader className="animate-spin" />

          {loadingText && <span>{loadingText}</span>}
        </span>
      ) : (
        <div className="flex items-center gap-2">
          {leftIcon && <span>{leftIcon}</span>}
          {children}
          {rightIcon && <span>{rightIcon}</span>}
        </div>
      )}
    </button>
  );
}
