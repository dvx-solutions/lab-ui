import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import { getApiDataAsSelectOptions } from '+/lib/getDataAsSelectOptions';
import {
  IAPIPaginatedResponse,
  IAtividadeEconomica,
  IQueryParams,
} from '+/types';

export const useAtividadesEconomicas = ({
  API_Instance,
  advancedSearch,
  pageNumber = 1,
  pageSize = 100000,
}: IQueryParams<keyof IAtividadeEconomica>) =>
  useQuery(
    [
      'atividades-economicas',
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const payload = {
        advancedSearch,
        pageNumber,
        pageSize,
      };
      return API_Instance.post<IAPIPaginatedResponse<IAtividadeEconomica[]>>(
        'tabelas/atividades-economicas/listar',
        payload
      ).then(({ data }) => ({
        data: data.data,
        options: getApiDataAsSelectOptions(data.data),
      }));
    }
  );
