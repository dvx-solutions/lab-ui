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
}

const BaseComponent: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { name, error, label, className = '', ...props },
  ref
) => (
  <FormControl
    isInvalid={!!error}
    className="flex w-full items-center justify-center gap-2"
  >
    {!!label && <Label label={label} name={name} isForCheckbox />}

    <input
      {...props}
      className={classNames(className, 'default-form-element h-6 w-6')}
      name={name}
      ref={ref}
      type="checkbox"
    />

    {!!error && (
      <FormErrorMessage className="mt-1 text-xs text-red-500">
        {error.message}
      </FormErrorMessage>
    )}
  </FormControl>
);

export const Checkbox = forwardRef(BaseComponent);
