import * as TabsPrimitive from '@radix-ui/react-tabs';
import { ReactNode, useEffect, useState } from 'react';

import { convertClassnames } from '../lib/convertClassnames';

export interface TabListProps {
  id: string;
  name: string;
}

export interface TabContentProps {
  children: ReactNode | string;
  tabFor: string;
}

export interface TabsProps {
  defaultTabIndex?: number;
  newCurrentTabIndex?: number;
  tabContentClassname?: string;
  tabListClassname?: {
    className?: string;
    activeClassName?: string;
  };
  tabsContent: Array<TabContentProps>;
  tabsList: Array<TabListProps>;
}

export function Tabs({
  defaultTabIndex = 0,
  newCurrentTabIndex,
  tabContentClassname,
  tabListClassname,
  tabsContent,
  tabsList,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabsList[defaultTabIndex].id);

  useEffect(() => {
    if (newCurrentTabIndex) setActiveTab(tabsList[newCurrentTabIndex].id);
  }, [newCurrentTabIndex, tabsList]);

  return (
    <TabsPrimitive.Root
      className="flex w-full flex-col gap-2 bg-transparent"
      onValueChange={setActiveTab}
      orientation="vertical"
      value={activeTab}
    >
      <TabsPrimitive.List className="flex w-full justify-center gap-2">
        {tabsList.map(({ id, name }) => (
          <TabsPrimitive.Trigger
            key={id}
            value={id}
            className={convertClassnames([
              'text-brand-text-primar w-full rounded bg-brand-primary/60 py-2 font-semibold text-brand-text-primary transition-all duration-300 hover:bg-brand-primary/50',
              tabListClassname?.className ?? '',
              activeTab === id
                ? [
                    'bg-brand-primary hover:bg-brand-primary/90',
                    tabListClassname?.activeClassName ?? '',
                  ].join(' ')
                : '',
            ])}
          >
            {name}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {tabsContent.map(({ children, tabFor }) => (
        <TabsPrimitive.Content
          value={tabFor}
          key={tabFor}
          className={convertClassnames([
            'rounded p-4',
            tabContentClassname ?? '',
          ])}
        >
          {children}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
