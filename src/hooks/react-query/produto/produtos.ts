import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  IProduto,
  IQueryParams,
  TSelectOption,
} from '+/types';

interface IUseProdutos extends IQueryParams<keyof IProduto> {
  agrupadorId?: number;
  naturezaProdutoId: number;
  planoId: number;
  tipoProdutoId?: number;
}

export const useProdutos = ({
  advancedSearch,
  agrupadorId,
  API_Instance,
  keyword,
  naturezaProdutoId,
  orderBy,
  pageNumber = 1,
  pageSize = 100000,
  planoId,
  tipoProdutoId,
}: IUseProdutos) => {
  return useQuery(
    [
      'produtos',
      `planoId-${planoId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const payload = {
        advancedSearch,
        agrupadorId,
        keyword,
        naturezaProdutoId,
        orderBy,
        pageNumber,
        pageSize,
        tipoProdutoId,
      };

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IProduto[]>
      >('produtos/produtos/listar', payload);

      data.data = data.data.filter(x => x.planoId === planoId);

      const options: TSelectOption[] = data.data.map(
        ({ codigo, id, nome }) => ({
          text: `${codigo} - ${nome}`,
          value: id,
        })
      );

      return { ...data, options };
    },
    { enabled: planoId > 0 }
  );
};
