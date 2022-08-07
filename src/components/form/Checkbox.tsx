/* eslint-disable react/function-component-definition */
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
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
  <FormControl
    isInvalid={!!error}
    className="flex w-full items-center justify-start gap-2"
  >
    <input
      {...props}
      className={classNames(
        heightShouldFit
          ? 'default-form-element h-4 w-4'
          : 'default-form-element h-6 w-6',
        className
      )}
      id={name}
      name={name}
      ref={ref}
      type="checkbox"
    />

    {!!label && <Label label={label} name={name} isForCheckbox />}

    {!!error && (
      <FormErrorMessage className="mt-1 text-xs text-red-500">
        {error.message}
      </FormErrorMessage>
    )}
  </FormControl>
);

export const Checkbox = forwardRef(BaseComponent);
