import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import { getDataAsSelectOptions } from '+/lib/getDataAsSelectOptions';
import {
  ENivelValorizacaoEvento,
  EOrigemValorEvento,
  IAPIPaginatedResponse,
  IEvento,
  IQueryParams,
} from '+/types';

interface Props extends IQueryParams<keyof IEvento> {
  empresaId: number;
  nivelValorizacao: ENivelValorizacaoEvento;
  origemEvento?: EOrigemValorEvento;
}

export const useEventos = ({
  advancedSearch,
  API_Instance,
  empresaId,
  keyword,
  nivelValorizacao,
  orderBy,
  origemEvento,
  pageNumber = 1,
  pageSize = 25,
}: Props) => {
  return useQuery(
    [
      'eventos',
      `empresaId-${empresaId}`,
      `nivelValorizacao-${nivelValorizacao}`,
      `origemEvento-${origemEvento}`,
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
        origemEvento,
        pageNumber,
        pageSize,
      };

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IEvento[]>
      >('colaboradores/eventos/listar', payload);

      if (origemEvento)
        data.data = data.data.filter(x => x.origemEvento === origemEvento);

      const options = getDataAsSelectOptions(data);

      return { ...data, options };
    }
  );
};
