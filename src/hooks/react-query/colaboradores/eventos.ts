import { useQuery } from '@tanstack/react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import { getDataAsSelectOptions } from '+/lib/getDataAsSelectOptions';
import {
  IAPIPaginatedResponse,
  IBodyRequest,
  IEvento,
  IQueryParams,
} from '+/types';

interface Props extends IQueryParams<keyof IEvento> {
  empresaId: number;
  nivelValorizacao?: number;
}

export const useEventos = ({
  advancedSearch,
  API_Instance,
  empresaId,
  keyword,
  nivelValorizacao,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
}: Props) => {
  return useQuery(
    [
      'eventos',
      `empresaId-${empresaId}`,
      `nivelValorizacao-${nivelValorizacao}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const payload = {
        advancedSearch,
        empresaId,
        keyword,
        nivelValorizacao,
        orderBy,
        pageNumber,
        pageSize,
      } as IBodyRequest;

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IEvento[]>
      >('colaboradores/eventos/listar', payload);

      const options = getDataAsSelectOptions(data);

      return { ...data, options };
    }
  );
};
