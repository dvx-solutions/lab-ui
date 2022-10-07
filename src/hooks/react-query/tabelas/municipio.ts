import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getApiDataAsSelectOptions,
  getReactQueryPaginationKeys,
} from '+/lib';
import { IAPIPaginatedResponse, IMunicipio, IQueryParams } from '+/types';

export const useMunicipios = ({
  API_Instance,
  advancedSearch,
  pageNumber = 1,
  pageSize = 100000,
}: IQueryParams<keyof IMunicipio>) =>
  useQuery(
    [
      'municipios',
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    () =>
      API_Instance.post<IAPIPaginatedResponse<IMunicipio[]>>(
        'tabelas/municipios/listar',
        {
          advancedSearch,
          pageNumber,
          pageSize,
        }
      ).then(({ data }) => ({
        ...data,
        options: getApiDataAsSelectOptions(data.data),
      }))
  );
