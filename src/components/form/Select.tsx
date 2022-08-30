/* eslint-disable react/function-component-definition */
import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react';
import { FieldError } from 'react-hook-form';

import { FormControl, FormErrorMessage, Label } from '+/components/form';
import { convertClassnames } from '+/lib';
import { TSelectOption } from '+/types';

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  error?: FieldError;
  heightShouldFit?: boolean;
  label?: string;
  name: string;
  options: TSelectOption[] | null | undefined;
  placeholder?: string;
  shouldSortValues?: boolean;
}

const BaseComponent: ForwardRefRenderFunction<
  HTMLSelectElement,
  SelectProps
> = (
  {
    className = '',
    error = null,
    heightShouldFit = false,
    label,
    name,
    options,
    placeholder = 'Selecione uma opção',
    shouldSortValues = true,
    ...props
  },
  ref
) => {
  if (shouldSortValues) options?.sort((a, b) => a.text.localeCompare(b.text));

  return (
    <FormControl>
      {!!label && <Label label={label} name={name} />}

      <select
        {...props}
        className={convertClassnames([
          'form-element-style border focus:border-brand-primary',
          className,
          error ? 'border-red-500' : 'border-gray-500',
          heightShouldFit
            ? 'form-element-with-fitted-height'
            : 'form-element-with-default-height',
        ])}
        id={name}
        name={name}
        placeholder={placeholder}
        ref={ref}
      >
        {options?.map(({ text, value }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>

      <FormErrorMessage error={error} />
    </FormControl>
  );
};

export const Select = forwardRef(BaseComponent);
