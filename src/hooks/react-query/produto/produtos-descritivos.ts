import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
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
  advancedSearch,
  API_Instance,
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
    () =>
      produtoId > 0
        ? API_Instance.post<
            IAPIPaginatedResponse<INaturezasProdutosTiposDescritivos[]>
          >('produtos/produtos-descritivos/listar', {
            advancedSearch,
            pageNumber,
            pageSize,
            produtoId,
          }).then(({ data }) => data.data)
        : null,
    { enabled: produtoId > 0 }
  );
