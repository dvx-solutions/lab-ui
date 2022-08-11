import { useQuery } from '@tanstack/react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  ICondicaoPagamento,
  IQueryParams,
  TSelectOption,
} from '+/types';

export const useCondicoesPagamentos = ({
  advancedSearch,
  API_Instance,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
}: IQueryParams<keyof ICondicaoPagamento>) => {
  return useQuery(
    [
      'condicoes-pagamentos',
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
        IAPIPaginatedResponse<ICondicaoPagamento[]>
      >('tabelas/condicoes-pagamentos/listar', payload);

      const options: TSelectOption[] = data.data.map(
        ({ codigo, nome, id }) => ({
          text: `${codigo} - ${nome}`,
          value: id,
        })
      );

      return { ...data, options };
    }
  );
};
