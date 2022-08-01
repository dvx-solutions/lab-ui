import { useQuery } from '@tanstack/react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  INaturezaConta,
  IQueryParams,
  TSelectOption,
} from '+/types';

export const useNaturezasContas = ({
  advancedSearch,
  API_Instance,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
}: IQueryParams<keyof INaturezaConta>) => {
  return useQuery(
    [
      'naturezas-contas',
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      `keyword-${keyword}`,
      `orderBy-${orderBy}`,
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
        IAPIPaginatedResponse<INaturezaConta[]>
      >('empresarial/naturezas-contas/listar', payload);

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.codigo} - ${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
};
