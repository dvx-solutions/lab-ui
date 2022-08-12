import { useQuery } from '@tanstack/react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import { getDataAsSelectOptions } from '+/lib/getDataAsSelectOptions';
import {
  IAPIPaginatedResponse,
  IAPIResponse,
  IQueryParams,
  ITipoOrdem,
} from '+/types';

interface UseTiposOrdensPorIdProps extends IQueryParams<keyof ITipoOrdem> {
  id: number;
}

export const useTiposOrdens = ({
  advancedSearch,
  API_Instance,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
}: IQueryParams<keyof ITipoOrdem>) => {
  return useQuery(
    [
      'tipos-ordens',
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
        IAPIPaginatedResponse<ITipoOrdem[]>
      >('financas/tipos-ordens/listar', payload);

      const options = getDataAsSelectOptions(data);

      return { ...data, options };
    }
  );
};

export const useTiposOrdensPorId = ({
  API_Instance,
  id,
}: UseTiposOrdensPorIdProps) => {
  return useQuery(['tipos-ordens', `id-${id}`], async () => {
    const { data } = await API_Instance.get<IAPIResponse<ITipoOrdem>>(
      `financas/tipos-ordens/${id}`
    );

    return data;
  });
};
