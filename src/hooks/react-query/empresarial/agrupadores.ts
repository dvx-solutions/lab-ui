import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

import { getApiDataAsSelectOptions } from '+/lib/getDataAsSelectOptions';
import {
  IAgrupador,
  IAPIPaginatedResponse,
  IAPIResponse,
  IQueryParams,
} from '+/types';

interface UseAgrupadoresProps extends IQueryParams<keyof IAgrupador> {
  nivel?: number;
  planoId: number;
}

export const useAgrupadores = ({
  API_Instance,
  nivel,
  pageSize = 100000,
  planoId,
}: UseAgrupadoresProps) =>
  useQuery(
    [
      'agrupadores',
      `planoId-${planoId}`,
      `nivel-${nivel}`,
      `pageSize-${pageSize}`,
    ],
    () =>
      API_Instance.post<IAPIPaginatedResponse<IAgrupador[]>>(
        'empresarial/agrupadores/listar',
        { pageSize: 100000 }
      ).then(({ data }) => {
        let filtered = data.data.filter(x => x.planoId === planoId);

        if (nivel) filtered = filtered.filter(x => x.nivel === nivel);

        return {
          data: filtered,
          options: getApiDataAsSelectOptions(filtered),
        };
      }),
    {
      enabled: planoId > 0,
    }
  );

export const useAgrupadorPorId = ({
  id,
  axiosInstance,
}: {
  id: number;
  axiosInstance: AxiosInstance;
}) =>
  useQuery(
    ['agrupadores', `id-${id}`],
    () =>
      axiosInstance
        .get<IAPIResponse<IAgrupador>>(`empresarial/agrupadores/${id}`)
        .then(({ data }) => data),
    { enabled: id > 0 }
  );
