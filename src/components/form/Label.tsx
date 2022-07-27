import { FormLabel } from '@chakra-ui/react';

import { classNames } from '+/lib';

interface Props {
  isForCheckbox?: boolean;
  label: string;
  name: string;
}

export function Label({ label, name, isForCheckbox = false }: Props) {
  return (
    <FormLabel
      htmlFor={name}
      className={classNames(
        'text-base font-normal text-slate-600',
        isForCheckbox ? 'mb-0' : 'mb-2 '
      )}
    >
      {label}
    </FormLabel>
  );
}
