/* eslint-disable react/function-component-definition */
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { Controller, ControllerProps } from 'react-hook-form';
import { FiDollarSign } from 'react-icons/fi';
import NumberFormat from 'react-number-format';

import { InputProps, Input } from '+/components/form/Input';
import { classNames } from '+/lib/formatters';

interface CurrencyProps extends InputProps {
  control: unknown;
}

const BaseComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  CurrencyProps
> = (
  {
    control,
    name,
    className = '',
    error,
    heightShouldFit,
    leftIcon,
    rightIcon = <FiDollarSign />,
    ...rest
  },
  ref
) => {
  const currencyInputProps = {
    allowEmptyFormatting: false,
    decimalScale: 2,
    decimalSeparator: ',',
    defaultValue: 0,
    fixedDecimalScale: true,
    thousandSeparator: '.',
  };

  const inpClassname = classNames(
    className,
    'w-full border text-gray-600 outline-none',
    error ? 'border-red-500' : 'form-element-with-focus',
    heightShouldFit
      ? 'form-element-with-height-fitted'
      : 'default-form-element',
    rightIcon || leftIcon ? 'pr-10' : 'pr-3'
  );

  return (
    <Controller
      control={control as ControllerProps['control']}
      name={name}
      render={({ field }) => {
        return (
          <NumberFormat
            {...currencyInputProps}
            {...field}
            {...rest}
            className={inpClassname}
            customInput={Input}
            defaultValue={currencyInputProps.defaultValue}
            onChange={field.onChange}
            ref={ref as unknown as undefined}
            rightIcon={rightIcon || leftIcon}
            type="text"
          />
        );
      }}
    />
  );
};

export const CurrencyInput = forwardRef(BaseComponent);
