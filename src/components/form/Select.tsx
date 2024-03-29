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
  isDisabled?: boolean;
  isReadOnly?: boolean;
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
    isDisabled,
    isReadOnly,
    ...props
  },
  ref
) => {
  if (shouldSortValues)
    options?.sort((a, b) => {
      const splitedA = a.text.split('-')[1];
      const splitedB = b.text.split('-')[1];
      if (!!splitedA && !!splitedB) return splitedA.localeCompare(splitedB);
      return a.text.localeCompare(b.text);
    });

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
        disabled={isDisabled || props.disabled || isReadOnly}
      >
        <option selected value={undefined}>
          {placeholder}
        </option>

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
