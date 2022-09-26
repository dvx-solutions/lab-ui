import { useQuery } from 'react-query';

import { convertAdvancedSearchToReactQueryKeys } from '+/lib/formatters';
import { IQueryParams, ITema, TSelectOption } from '+/types';
import { IAPIPaginatedResponse } from '+/types/axios';

interface IUseTemas extends IQueryParams<keyof ITema> {
  empresaAnoFiscalId: number;
  quadroId: number;
}

export const useTemas = ({
  advancedSearch,
  API_Instance,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 9999,
  empresaAnoFiscalId,
  quadroId,
}: IUseTemas) => {
  const payload = {
    advancedSearch: [advancedSearch ? { ...advancedSearch } : {}],
    keyword,
    orderBy,
    pageNumber,
    pageSize,
    empresaAnoFiscalId,
    quadroId,
  };

  return useQuery(
    [
      'temas',
      `temas-quadroId-${quadroId}`,
      `ano-fiscal-id-${empresaAnoFiscalId}`,
    ],
    async () => {
      const { data } = await API_Instance.post<IAPIPaginatedResponse<ITema[]>>(
        'producoes/temas/listar',
        payload
      );

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
};
