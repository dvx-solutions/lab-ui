import { ButtonHTMLAttributes, ReactNode } from 'react';
import { FiLoader } from 'react-icons/fi';

import { convertClassnames } from '+/lib/convertClassnames';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
