import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  IAPIResponse,
  IConvenioCobranca,
  IQueryParams,
  TSelectOption,
} from '+/types';

interface UseConveniosCobrancasPorIdProps
  extends IQueryParams<keyof IConvenioCobranca> {
  id: number;
}

export const useConveniosCobrancas = ({
  API_Instance,
  advancedSearch,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
}: IQueryParams<keyof IConvenioCobranca>) => {
  return useQuery(
    [
      'convenios-cobrancas',
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
        IAPIPaginatedResponse<IConvenioCobranca[]>
      >('financas/convenios-cobrancas/listar', payload);

      const options: TSelectOption[] = data.data.map(({ id, numero }) => ({
        text: numero,
        value: id ?? 0,
      }));

      return { ...data, options };
    }
  );
};

export const useConveniosCobrancasPorId = ({
  API_Instance,
  id,
}: UseConveniosCobrancasPorIdProps) => {
  return useQuery(['convenios-cobrancas', `id-${id}`], async () => {
    const { data } = await API_Instance.get<IAPIResponse<IConvenioCobranca>>(
      `financas/convenios-cobrancas/${id}`
    );

    return data;
  });
};
