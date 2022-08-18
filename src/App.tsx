import { useState } from 'react';

import { Button } from './components/buttons/Button';
import { Tabs } from './components/Tabs';

export function App() {
  const [current, dispatch] = useState(0);
  return (
    <div className="w[100vw] flex h-[100vh] items-center justify-center">
      <div className="w-3/4 p-4">
        <Tabs
          tabsList={[
            { id: 'basic_infos', name: 'Infos básicas' },
            { id: 'money', name: 'Valores' },
          ]}
          tabsContent={[
            { tabFor: 'basic_infos', children: <p>1</p> },
            { tabFor: 'money', children: <p>2</p> },
          ]}
        />

        <div className="flex gap-2">
          <Button
            type="button"
            className="primary-button"
            onClick={() =>
              dispatch(curr => {
                if (curr === 0) return 0;
                return curr - 1;
              })
            }
          >
            Decrease tab
          </Button>

          <Button
            type="button"
            className="primary-button"
            onClick={() => dispatch(curr => curr + 1)}
          >
            Increase tab
          </Button>
        </div>
      </div>
    </div>
  );
}
