import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import { getDataAsSelectOptions } from '+/lib/getDataAsSelectOptions';
import {
  IAPIPaginatedResponse,
  IAPIResponse,
  IContaContabil,
  IQueryByIdParams,
  IQueryParams,
} from '+/types';

interface UseContasContabeisPorIdProps
  extends IQueryParams<keyof IContaContabil> {
  id: number;
}

interface UseContasContabeisProps extends IQueryParams<keyof IContaContabil> {
  planoContaContabilId: number;
}

export const useContasContabeis = ({
  API_Instance,
  advancedSearch,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 100000,
  planoContaContabilId,
}: UseContasContabeisProps) => {
  return useQuery(
    [
      'contas-contabeis',
      `planoContaContabilId-${planoContaContabilId}`,
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
        IAPIPaginatedResponse<IContaContabil[]>
      >('financas/contas-contabeis/listar', payload);

      data.data = data.data.filter(x => x.planoId === planoContaContabilId);

      const options = getDataAsSelectOptions(data);

      return { ...data, options };
    }
  );
};

export const useContasContabeisPorId = ({
  axiosInstance,
  id,
}: IQueryByIdParams) => {
  return useQuery(['contas-contabeis', `id-${id}`], async () => {
    const { data } = await axiosInstance.get<IAPIResponse<IContaContabil>>(
      `financas/contas-fluxos/${id}`
    );

    return data;
  });
};
