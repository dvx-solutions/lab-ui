import { FormLabel } from '@chakra-ui/react';

interface Props {
  name: string;
  label: string;
}

export function Label({ label, name }: Props) {
  return (
    <FormLabel
      htmlFor={name}
      className="mb-2 text-base font-normal text-[#52566E]"
    >
      {label}
    </FormLabel>
  );
}
