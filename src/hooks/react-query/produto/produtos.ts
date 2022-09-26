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

export const useProdutos = ({
  advancedSearch,
  API_Instance,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
}: IQueryParams<keyof IProduto>) => {
  return useQuery(
    [
      'produtos',
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
        IAPIPaginatedResponse<IProduto[]>
      >('produtos/produtos/listar', payload);

      const options: TSelectOption[] = data.data.map(
        ({ codigo, id, nome }) => ({
          text: `${codigo} - ${nome}`,
          value: id,
        })
      );

      return { ...data, options };
    }
  );
};
