import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import { getDataAsSelectOptions } from '+/lib/getDataAsSelectOptions';
import {
  IAPIPaginatedResponse,
  IAPIResponse,
  IContaOrcamentaria,
  IQueryParams,
} from '+/types';

interface UseContasReceitasPorIdProps
  extends IQueryParams<keyof IContaOrcamentaria> {
  id: number;
}

export const useContasReceitas = ({
  API_Instance,
  advancedSearch,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
}: IQueryParams<keyof IContaOrcamentaria>) => {
  return useQuery(
    [
      'contas-receitas',
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
        IAPIPaginatedResponse<IContaOrcamentaria[]>
      >('financas/contas-orcamentarias/listar', payload);

      const options = getDataAsSelectOptions(data);

      return { ...data, options };
    }
  );
};

export const useContasReceitasPorId = ({
  API_Instance,
  id,
}: UseContasReceitasPorIdProps) => {
  return useQuery(['contas-receitas', `id-${id}`], async () => {
    const { data } = await API_Instance.get<IAPIResponse<IContaOrcamentaria>>(
      `financas/contas-receitas/${id}`
    );

    return data;
  });
};
