import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import { getDataAsSelectOptions } from '+/lib/getDataAsSelectOptions';
import {
  IAPIPaginatedResponse,
  IAPIResponse,
  INaturezaProduto,
  IQueryByIdParams,
  IQueryParams,
} from '+/types';

export const useNaturezaProdutoPorId = ({
  axiosInstance,
  id,
}: IQueryByIdParams) =>
  useQuery(
    ['naturezas-produtos', id],
    () =>
      axiosInstance
        .get<IAPIResponse<INaturezaProduto>>(
          `produtos/naturezas-produtos/${id}`
        )
        .then(({ data }) => data.data),
    { enabled: id > 0 }
  );

export const useNaturezaProdutos = ({
  API_Instance,
  advancedSearch,
  pageNumber = 1,
  pageSize = 100000,
}: IQueryParams<keyof INaturezaProduto>) =>
  useQuery(
    [
      'naturezas-produtos',
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    () =>
      API_Instance.post<IAPIPaginatedResponse<INaturezaProduto[]>>(
        'produtos/naturezas-produtos/listar',
        { advancedSearch, pageNumber, pageSize }
      ).then(({ data }) => ({
        data: data.data,
        options: getDataAsSelectOptions(data),
      }))
  );
