import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import { getDataAsSelectOptions } from '+/lib/getDataAsSelectOptions';
import { IAPIPaginatedResponse, IQueryParams, TabelaBasicaType } from '+/types';

export const useTiposProdutos = ({
  API_Instance,
  advancedSearch,
  pageNumber = 1,
  pageSize = 100000,
}: IQueryParams<keyof TabelaBasicaType>) =>
  useQuery(
    [
      'tipos-produtos',
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<TabelaBasicaType[]>
      >('produtos/tipos-produtos/listar', { pageNumber, pageSize });

      return {
        data: data.data,
        options: getDataAsSelectOptions(data),
      };
    }
  );
