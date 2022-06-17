import { FormLabel, FormLabelProps } from "@chakra-ui/react";

import { classNames } from "+/lib/formatters";

interface Props extends FormLabelProps {
  name: string;
  label: string;
}

export function Label({ label, name, className = "", ...rest }: Props) {
  return (
    <FormLabel
      htmlFor={name}
      className={classNames(
        className,
        "mb-2 text-base font-normal text-[#52566E]"
      )}
      {...rest}
    >
      {label}
    </FormLabel>
  );
}
