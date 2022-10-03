import {
  Content,
  Portal,
  Provider,
  Root,
  Trigger,
} from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';

export interface TooltipProps {
  children: ReactNode;
  label: string | ReactNode;
}

export function Tooltip({ children, label }: TooltipProps) {
  return (
    <Provider>
      <Root delayDuration={0}>
        <Trigger>{children}</Trigger>

        <Portal>
          <Content
            className="rounded bg-gray-700 py-2 px-4 text-xs text-gray-100"
            sideOffset={5}
          >
            {label}
          </Content>
        </Portal>
      </Root>
    </Provider>
  );
}
