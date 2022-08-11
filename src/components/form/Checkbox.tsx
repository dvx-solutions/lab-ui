/* eslint-disable react/function-component-definition */
import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react';
import { FieldError } from 'react-hook-form';

import { Label } from '+/components/form/Label';
import { classNames } from '+/lib';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  label?: string;
  name: string;
  heightShouldFit?: boolean;
}

const BaseComponent: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { name, error, label, heightShouldFit = false, className = '', ...props },
  ref
) => (
  <div className="flex w-full flex-col items-start justify-start">
    <div className="flex items-center justify-start gap-2">
      <input
        {...props}
        className={classNames(
          heightShouldFit
            ? 'form-element-with-fitted-height h-4 w-4'
            : 'form-element-with-default-height m-0 h-8 w-8',
          className,
          'bg-brand-primary'
        )}
        id={name}
        name={name}
        ref={ref}
        type="checkbox"
      />

      {!!label && <Label label={label} name={name} isForCheckbox />}
    </div>

    {!!error && (
      <span className="mt-1 text-sm text-red-500">{error.message}</span>
    )}
  </div>
);

export const Checkbox = forwardRef(BaseComponent);
