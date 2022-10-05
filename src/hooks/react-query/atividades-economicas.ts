import { useQuery } from 'react-query';

import { getApiDataAsSelectOptions } from '+/lib/getDataAsSelectOptions';
import {
  IAPIPaginatedResponse,
  IAtividadeEconomica,
  IQueryByIdParams,
} from '+/types';

export const useAtividadesEconomicas = ({ axiosInstance }: IQueryByIdParams) =>
  useQuery(['atividades-economicas'], () =>
    axiosInstance
      .post<IAPIPaginatedResponse<IAtividadeEconomica[]>>(
        'tabelas/atividades-economicas/listar',
        {
          pageSize: 100000,
        }
      )
      .then(({ data }) => {
        return {
          data: data.data,
          options: getApiDataAsSelectOptions(data.data),
        };
      })
  );
