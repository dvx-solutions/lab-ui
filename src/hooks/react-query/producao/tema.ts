import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  IQueryParams,
  ITema,
  TSelectOption,
} from '+/types';

interface IUseTemas extends IQueryParams<keyof ITema> {
  empresaAnoFiscalId: number;
  quadroId: number;
}

export const useTemas = ({
  advancedSearch,
  API_Instance,
  empresaAnoFiscalId,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 100000,
  quadroId,
}: IUseTemas) => {
  return useQuery(
    [
      'temas',
      `quadroId-${quadroId}`,
      `empresaAnoFiscalId-${empresaAnoFiscalId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const payload = {
        advancedSearch,
        empresaAnoFiscalId,
        keyword,
        orderBy,
        pageNumber,
        pageSize,
        quadroId,
      };

      const { data } = await API_Instance.post<IAPIPaginatedResponse<ITema[]>>(
        'producoes/temas/listar',
        payload
      );

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.codigo} - ${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    },
    {
      enabled: quadroId > 0 && empresaAnoFiscalId > 0,
    }
  );
};
