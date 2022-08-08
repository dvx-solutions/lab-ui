/* eslint-disable react/function-component-definition */
import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import { FieldError } from 'react-hook-form';

import { Label } from '+/components/form/Label';
import { classNames } from '+/lib/formatters';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  heightShouldFit?: boolean;
  label?: string;
  leftIcon?: ReactNode;
  name: string;
  rightIcon?: ReactNode;
}

const BaseComponent: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    name,
    error = null,
    type = 'text',
    label,
    rightIcon,
    leftIcon,
    className = '',
    heightShouldFit = false,
    ...props
  },
  ref
) => {
  const elementClassname = classNames(
    'form-element-style border focus:border-brand-primary',
    className,
    error ? 'border-red-500' : 'border-gray-500',
    heightShouldFit
      ? 'form-element-with-fitted-height'
      : 'form-element-with-default-height',
    rightIcon || leftIcon ? 'pr-9' : ''
  );

  return (
    <div className="flex w-full flex-col items-start justify-start">
      {!!label && <Label label={label} name={name} />}

      <div className="relative flex w-full items-center justify-center">
        <input
          {...props}
          className={elementClassname}
          id={name}
          name={name}
          ref={ref}
          type={type}
        />

        {(rightIcon || leftIcon) && (
          <div
            className={classNames(
              'absolute right-0 z-10 flex h-full w-10 items-center justify-center',
              error ? 'text-red-500' : ''
            )}
          >
            {rightIcon || leftIcon}
          </div>
        )}
      </div>

      {!!error && (
        <span className="mt-1 text-xs text-red-500">{error.message}</span>
      )}
    </div>
  );
};

export const Input = forwardRef(BaseComponent);
