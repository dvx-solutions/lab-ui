import { Tabs } from './components/Tabs';

export function App() {
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
      </div>
    </div>
  );
}
