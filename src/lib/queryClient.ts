import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000, // 10 minutos
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchInterval: false,
      retry: false,
    },
  },
});
