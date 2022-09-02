import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './lib/queryClient';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div />
    </QueryClientProvider>
  );
}
