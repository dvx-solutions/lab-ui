import { useQuery } from '@tanstack/react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  IAPIResponse,
  IContaMovimento,
  IQueryParams,
  TSelectOption,
} from '+/types';

interface UseContasMovimentosPorIdProps
  extends IQueryParams<keyof IContaMovimento> {
  id: number;
}

export const useContasMovimentos = ({
  API_Instance,
  advancedSearch,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
}: IQueryParams<keyof IContaMovimento>) => {
  return useQuery(
    [
      'contas-movimentos',
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const payload = {
        advancedSearch,
        keyword,
        orderBy,
        pageNumber,
        pageSize,
      };

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IContaMovimento[]>
      >('financas/contas-movimentos/listar', payload);

      const options: TSelectOption[] = data.data.map(
        ({ id, numeroContaCorrente, digitoContaCorrente }) => ({
          text: `${numeroContaCorrente}-${digitoContaCorrente}`,
          value: id ?? 0,
        })
      );

      return { ...data, options };
    }
  );
};

export const useContasMovimentosPorId = ({
  API_Instance,
  id,
}: UseContasMovimentosPorIdProps) => {
  return useQuery(['contas-movimentos', `id-${id}`], async () => {
    const { data } = await API_Instance.get<IAPIResponse<IContaMovimento>>(
      `financas/contas-movimentos/${id}`
    );

    return data;
  });
};
