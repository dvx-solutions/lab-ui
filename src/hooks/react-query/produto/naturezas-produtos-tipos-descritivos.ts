// import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import { getApiDataAsSelectOptions } from '+/lib/getDataAsSelectOptions';
import {
  IAPIPaginatedResponse,
  IAPIResponse,
  INaturezasProdutosTiposDescritivos,
  IQueryByIdParams,
  IQueryParams,
} from '+/types';

interface useNaturezasProdutosTiposDescritivosProps
  extends IQueryParams<keyof INaturezasProdutosTiposDescritivos> {
  naturezaProdutoId?: number;
}

export const useNaturezasProdutosTiposDescritivos = ({
  naturezaProdutoId,
  API_Instance,
  advancedSearch,
  pageNumber = 1,
  pageSize = 100000,
}: useNaturezasProdutosTiposDescritivosProps) =>
  useQuery(
    [
      'naturezas-produtos-tipos-descritivos',
      `naturezaProdutoId-${naturezaProdutoId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    () =>
      API_Instance.post<
        IAPIPaginatedResponse<INaturezasProdutosTiposDescritivos[]>
      >('produtos/naturezas-produtos-tipos-descritivos/listar', {
        pageNumber,
        pageSize,
        advancedSearch,
      }).then(({ data }) => {
        if (naturezaProdutoId)
          data.data = data.data.filter(
            x => x.naturezaProdutoId === naturezaProdutoId
          );

        return {
          data: data.data,
          options: getApiDataAsSelectOptions(data.data),
        };
      })
  );

export const useNaturezasProdutosTiposDescritivosPorId = ({
  axiosInstance,
  id,
}: IQueryByIdParams) =>
  useQuery(
    ['naturezas-produtos-tipos-descritivos', `id-${id}`],
    () =>
      axiosInstance
        .get<IAPIResponse<INaturezasProdutosTiposDescritivos>>(
          `produtos/naturezas-produtos-tipos-descritivos/${id}`
        )
        .then(({ data }) => data.data),
    { enabled: id > 0 }
  );
