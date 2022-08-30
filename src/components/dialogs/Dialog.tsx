import { Root, Overlay, Content, Title, Close } from '@radix-ui/react-dialog';
import { ReactNode } from 'react';
import { FiX } from 'react-icons/fi';

import { Button } from '+/components/buttons/Button';

export interface DialogDisclosureProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export interface DialogProps extends DialogDisclosureProps {
  children: ReactNode;
  title: string;
}

export function Dialog({
  children,
  isOpen,
  onClose,
  onOpen,
  title,
}: DialogProps) {
  const handleStateChange = (state: boolean) => {
    if (state) {
      onOpen();
    } else {
      onClose();
    }
  };

  return (
    <Root open={isOpen} onOpenChange={handleStateChange}>
      <Overlay className="fixed inset-0 z-[999] bg-black/25" />

      <Content className="fixed top-2/4 left-2/4 z-[9999] w-fit min-w-[25vw] -translate-y-2/4 -translate-x-2/4 rounded bg-white p-4 shadow-md">
        <Title className="mb-4 flex items-center justify-between gap-16 text-xl font-medium">
          {title}
          <Close>
            <Button className="rounded-full p-1 transition-all duration-300 hover:bg-brand-primary hover:text-brand-text-primary">
              <FiX />
            </Button>
          </Close>
        </Title>

        {children}
      </Content>
    </Root>
  );
}
