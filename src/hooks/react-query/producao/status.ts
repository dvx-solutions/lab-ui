import { useQuery } from 'react-query';

import { getApiDataAsSelectOptions } from '+/lib';
import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib/formatters';
import { IQueryParams, IStatus } from '+/types';
import { IAPIPaginatedResponse } from '+/types/axios';

interface IUseStatus extends IQueryParams<keyof IStatus> {
  empresaAnoFiscalId: number;
  quadroId: number;
}

export const useStatus = ({
  advancedSearch,
  API_Instance,
  empresaAnoFiscalId,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 100000,
  quadroId,
}: IUseStatus) =>
  useQuery(
    [
      'status',
      `quadroId-${quadroId}`,
      `empresaAnoFiscalId-${empresaAnoFiscalId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      if (quadroId <= 0) return null;

      const payload = {
        advancedSearch,
        empresaAnoFiscalId,
        keyword,
        orderBy,
        pageNumber,
        pageSize,
        quadroId,
      };

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IStatus[]>
      >('producoes/status/listar', payload);

      return { ...data, options: getApiDataAsSelectOptions(data.data) };
    }
  );
