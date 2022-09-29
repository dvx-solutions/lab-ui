/* eslint-disable react/function-component-definition */
import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react';
import { FieldError } from 'react-hook-form';

import { Label } from '+/components/form/Label';
import { classNames } from '+/lib/formatters';

export interface TextareaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError;
  isDisabled?: boolean;
  isReadonly?: boolean;
  label?: string;
  name: string;
}

const BaseComponent: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaProps
> = (
  {
    className = '',
    error = null,
    isDisabled,
    isReadonly,
    label,
    name,
    ...props
  },
  ref
) => {
  return (
    <div className="flex w-full flex-col items-start justify-start">
      {!!label && <Label label={label} name={name} />}

      <div className="relative flex w-full items-center justify-center">
        <textarea
          {...props}
          className={classNames(
            'form-element-style border focus:border-brand-primary',
            className,
            error ? 'border-red-500' : 'border-gray-500'
          )}
          id={name}
          name={name}
          ref={ref}
          disabled={isDisabled || props.disabled}
          readOnly={isReadonly || props.readOnly}
        />
      </div>

      {!!error && (
        <span className="mt-1 text-xs text-red-500">{error.message}</span>
      )}
    </div>
  );
};

export const Textarea = forwardRef(BaseComponent);
