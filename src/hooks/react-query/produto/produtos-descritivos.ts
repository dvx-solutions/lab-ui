import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getDataAsSelectOptions,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  INaturezasProdutosTiposDescritivos,
  IProdutoDescritivo,
  IQueryParams,
} from '+/types';

interface UseProdutosDescritivosProps
  extends IQueryParams<keyof IProdutoDescritivo> {
  produtoId: number;
}

export const useProdutosDescritivos = ({
  API_Instance,
  advancedSearch,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 100000,
  produtoId,
}: UseProdutosDescritivosProps) =>
  useQuery(
    [
      'produtos-descritivos',
      `produtoId-${produtoId}`,
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
        produtoId,
      };
      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<INaturezasProdutosTiposDescritivos[]>
      >('produtos/produtos-descritivos/listar', payload);

      return {
        data: data.data,
        options: getDataAsSelectOptions(data),
      };
    }
    // () =>
    //   produtoId > 0
    //     ? API_Instance.post<
    //         IAPIPaginatedResponse<INaturezasProdutosTiposDescritivos[]>
    //       >('produtos/produtos-descritivos/listar', {
    //         advancedSearch,
    //         pageNumber,
    //         pageSize,
    //         produtoId,
    //       }).then(({ data }) => data.data)
    //     : null,
    // { enabled: produtoId > 0 }
  );
