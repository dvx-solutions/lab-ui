import { useQuery } from 'react-query';

import { getApiDataAsSelectOptions } from '+/lib/getDataAsSelectOptions';
import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  ICodigoTributacaoMunicipio,
  IQueryParams,
} from '+/types';

export const useCodigoTributacaoMunicipios = ({
  API_Instance,
  advancedSearch,
  pageNumber = 1,
  pageSize = 100000,
}: IQueryParams<keyof ICodigoTributacaoMunicipio>) =>
  useQuery(
    [
      'codigo-tributacao-municipios',
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const payload = {
        advancedSearch,
        pageNumber,
        pageSize,
      };
      API_Instance.post<IAPIPaginatedResponse<ICodigoTributacaoMunicipio[]>>(
        'tabelas/codigo-tributacao-municipios/listar',
        payload
      ).then(({ data }) => ({
        data: data.data,
        options: getApiDataAsSelectOptions(data.data),
      }));
    }
  );
