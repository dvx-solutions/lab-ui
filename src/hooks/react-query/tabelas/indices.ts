import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  IIndice,
  IQueryParams,
  TSelectOption,
} from '+/types';

export const useIndices = ({
  advancedSearch,
  API_Instance,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
}: IQueryParams<keyof IIndice>) => {
  return useQuery(
    [
      'indices',
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
        IAPIPaginatedResponse<IIndice[]>
      >('tabelas/indices/listar', payload);

      const options: TSelectOption[] = data.data.map(
        ({ codigo, nome, id }) => ({ text: `${codigo} - ${nome}`, value: id })
      );

      return { ...data, options };
    }
  );
};
