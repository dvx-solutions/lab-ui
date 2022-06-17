/* eslint-disable react/function-component-definition */
import {
  FormControl,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  HTMLInputTypeAttribute,
} from "react";
import { FieldError } from "react-hook-form";
import NumberFormat from "react-number-format";

import { Label } from "+/components/form/Label";
import { classNames } from "+/lib/formatters";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  error?: FieldError;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isCurrencyInput?: boolean;
}

const BaseComponent: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    name,
    error = null,
    type = "text",
    label,
    rightIcon,
    leftIcon,
    className = "",
    isCurrencyInput = false,
    ...props
  },
  ref
) => {
  const currencyInputProps = {
    thousandSeparator: ".",
    decimalSeparator: ",",
    fixedDecimalScale: true,
    allowEmptyFormatting: false,
    decimalScale: 2,
  };

  return (
    <FormControl isInvalid={!!error} className="w-full">
      {!!label && <Label label={label} name={name} />}

      <InputGroup className="relative flex w-full">
        {leftIcon && (
          <InputLeftElement className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center">
            {leftIcon}
          </InputLeftElement>
        )}

        <ChakraInput
          name={name}
          id={name}
          type={isCurrencyInput ? "text" : type}
          ref={ref}
          as={isCurrencyInput ? NumberFormat : ChakraInput}
          className={classNames(
            className,
            "h-10 w-full rounded-lg border text-gray-400 outline-none focus:border-purple-600",
            error ? "border-red-500" : "border-gray-500",
            leftIcon ? "pl-10" : "pl-3",
            rightIcon ? "pr-10" : "pr-3"
          )}
          {...props}
          {...(isCurrencyInput ? { ...currencyInputProps } : {})}
        />

        {rightIcon && (
          <InputRightElement className="absolute right-0 top-0 z-10 flex h-10 w-10 items-center justify-center">
            {rightIcon}
          </InputRightElement>
        )}
      </InputGroup>

      {!!error && (
        <FormErrorMessage className="mt-1 text-xs text-red-500">
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export const Input = forwardRef(BaseComponent);
