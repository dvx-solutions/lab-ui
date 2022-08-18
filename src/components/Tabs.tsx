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
  initialTabIndex?: number;
  newTab?: string;
  onChangeNewTab?: (tab: string) => void;
  tabContentClassname?: string;
  tabListActiveClassname?: string;
  tabListClassname?: string;
  tabsContent: Array<TabContentProps>;
  tabsList: Array<TabListProps>;
}

export function Tabs({
  initialTabIndex = 0,
  newTab,
  onChangeNewTab,
  tabContentClassname = '',
  tabListActiveClassname = '',
  tabListClassname = '',
  tabsContent,
  tabsList,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabsList[initialTabIndex].id);

  const handleChangeTab = (new_tab: string) => {
    setActiveTab(new_tab);
    if (onChangeNewTab) onChangeNewTab(new_tab);
  };

  useEffect(() => {
    if (newTab) setActiveTab(newTab);
  }, [newTab]);

  return (
    <TabsPrimitive.Root
      className="flex w-full flex-col gap-2 bg-transparent"
      onValueChange={handleChangeTab}
      orientation="vertical"
      value={activeTab}
    >
      <TabsPrimitive.List className="flex w-full justify-center gap-2">
        {tabsList.map(({ id, name }) => (
          <TabsPrimitive.Trigger
            className={convertClassnames([
              'text-brand-text-primar w-full rounded bg-brand-primary/60 py-2 font-semibold text-brand-text-primary transition-all duration-300 hover:bg-brand-primary/50',
              activeTab === id
                ? [
                    'bg-brand-primary hover:bg-brand-primary/90',
                    tabListActiveClassname,
                  ].join(' ')
                : tabListClassname,
            ])}
            key={id}
            value={id}
          >
            {name}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {tabsContent.map(({ children, tabFor }) => (
        <TabsPrimitive.Content
          className={convertClassnames(['rounded p-4', tabContentClassname])}
          key={tabFor}
          value={tabFor}
        >
          {children}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
