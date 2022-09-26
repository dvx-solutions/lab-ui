import { useQuery } from 'react-query';

import { convertAdvancedSearchToReactQueryKeys } from '+/lib/formatters';
import { IQueryParams, IStatus, TSelectOption } from '+/types';
import { IAPIPaginatedResponse } from '+/types/axios';

interface IUseStatus extends IQueryParams<keyof IStatus> {
  empresaAnoFiscalId: number;
  quadroId: number;
}

export const useStatus = ({
  advancedSearch,
  API_Instance,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 9999,
  empresaAnoFiscalId,
  quadroId,
}: IUseStatus) => {
  const payload = {
    advancedSearch: [advancedSearch ? { ...advancedSearch } : {}],
    keyword,
    orderBy,
    pageNumber,
    pageSize,
    empresaAnoFiscalId,
    quadroId,
  };

  return useQuery(
    [
      'status',
      `status-quadroId-${quadroId}`,
      `status-ano-fiscal-id-${empresaAnoFiscalId}`,
    ],
    async () => {
      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IStatus[]>
      >('producoes/status/listar', payload);

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
};
