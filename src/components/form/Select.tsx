/* eslint-disable react/function-component-definition */
import {
  FormControl,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  FormErrorMessage,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

import { Label } from "+/components/form/Label";
import { classNames } from "+/lib/formatters";
import { TSelectOption } from "+/types";

interface SelectProps extends ChakraSelectProps {
  name: string;
  label?: string;
  labelColor?: string;
  options: TSelectOption[] | null;
  error?: FieldError;
  placeholder?: string;
  widthShouldFit?: boolean;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  {
    name,
    label,
    options,
    error = null,
    placeholder = "Selecione uma opção",
    widthShouldFit = false,
    className = "",
    ...rest
  },
  ref
) => {
  return (
    <FormControl isInvalid={!!error} className="w-full">
      {!!label && <Label label={label} name={name} />}

      <ChakraSelect
        name={name}
        id={name}
        ref={ref}
        placeholder={placeholder}
        className={classNames(
          className,
          "h-10 appearance-none rounded-lg border px-5 text-gray-400 outline-none focus:border-purple-600 ",
          widthShouldFit ? "w-fit" : "w-full",
          error ? "border-red-500" : "border-gray-500"
        )}
        {...rest}
      >
        {options &&
          options.map(({ text, value }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
      </ChakraSelect>

      {!!error && (
        <FormErrorMessage className="mt-1 text-xs text-red-500">
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export const Select = forwardRef(SelectBase);
