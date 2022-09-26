import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import { getDataAsSelectOptions } from '+/lib/getDataAsSelectOptions';
import { IAPIPaginatedResponse, IQueryParams, ITabelaBasica } from '+/types';

export const useModalidadesContratos = ({
  API_Instance,
  advancedSearch,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
}: IQueryParams<keyof ITabelaBasica>) => {
  return useQuery(
    [
      'modalidades-contratos',
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
        IAPIPaginatedResponse<ITabelaBasica[]>
      >('faturamentos/modalidades-contratos/listar', payload);

      const options = getDataAsSelectOptions(data);

      return { ...data, options };
    }
  );
};
