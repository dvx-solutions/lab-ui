import { useQuery } from '@tanstack/react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib/formatters';
import { getDataAsSelectOptions } from '+/lib/getDataAsSelectOptions';
import {
  IAPIPaginatedResponse,
  IAPIResponse,
  IContaFluxo,
  IQueryParams,
} from '+/types';

interface UseContasFluxoPorIdProps extends IQueryParams<keyof IContaFluxo> {
  id: number;
}

export const useContasFluxo = ({
  API_Instance,
  advancedSearch,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
}: IQueryParams<keyof IContaFluxo>) => {
  return useQuery(
    [
      'contas-fluxos',
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
        IAPIPaginatedResponse<IContaFluxo[]>
      >('financas/contas-fluxos/listar', payload);

      const options = getDataAsSelectOptions(data);

      return { ...data, options };
    }
  );
};

export const useContasFluxoPorId = ({
  API_Instance,
  id,
}: UseContasFluxoPorIdProps) => {
  return useQuery(['contas-fluxos', `id-${id}`], async () => {
    const { data } = await API_Instance.get<IAPIResponse<IContaFluxo>>(
      `financas/contas-fluxos/${id}`
    );

    return data;
  });
};
