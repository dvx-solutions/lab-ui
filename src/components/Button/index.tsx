import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react';

import { classNames } from 'lib/formatters';

export function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <ChakraButton
      className={classNames('primary-button', className)}
      {...props}
    >
      {children}
    </ChakraButton>
  );
}
