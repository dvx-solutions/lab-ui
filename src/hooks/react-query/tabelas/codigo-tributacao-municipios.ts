import { useQuery } from 'react-query';

import { getApiDataAsSelectOptions } from '+/lib/getDataAsSelectOptions';
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
  useQuery(['codigo-tributacao-municipios'], () =>
    API_Instance.post<IAPIPaginatedResponse<ICodigoTributacaoMunicipio[]>>(
      'tabelas/codigo-tributacao-municipios/listar',
      {
        advancedSearch,
        pageNumber,
        pageSize,
      }
    ).then(({ data }) => ({
      data: data.data,
      options: getApiDataAsSelectOptions(data.data),
    }))
  );
