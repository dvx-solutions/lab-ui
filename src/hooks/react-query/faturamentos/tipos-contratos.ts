import { useQuery } from '@tanstack/react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import { getDataAsSelectOptions } from '+/lib/getDataAsSelectOptions';
import {
  IAPIPaginatedResponse,
  IAPIResponse,
  IQueryParams,
  ITipoContrato,
} from '+/types';

interface UseTiposContratosPorIdProps
  extends IQueryParams<keyof ITipoContrato> {
  id: number;
}

export const useTiposContratos = ({
  advancedSearch,
  API_Instance,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
}: IQueryParams<keyof ITipoContrato>) => {
  return useQuery(
    [
      'tipos-contratos',
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
        IAPIPaginatedResponse<ITipoContrato[]>
      >('faturamentos/tipos-contratos/listar', payload);

      const options = getDataAsSelectOptions(data);

      return { ...data, options };
    }
  );
};

export const useTiposContratosPorId = ({
  API_Instance,
  id,
}: UseTiposContratosPorIdProps) => {
  return useQuery(['tipos-contratos', `id-${id}`], async () => {
    const { data } = await API_Instance.get<IAPIResponse<ITipoContrato>>(
      `faturamentos/tipos-contratos/${id}`
    );

    return data;
  });
};
