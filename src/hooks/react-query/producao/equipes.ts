import { useQuery } from 'react-query';

import { convertAdvancedSearchToReactQueryKeys } from '+/lib/formatters';
import { IEquipe, IQueryParams, TSelectOption } from '+/types';
import { IAPIPaginatedResponse } from '+/types/axios';

interface IUseEquipes extends IQueryParams<keyof IEquipe> {
  empresaAnoFiscalId: number;
}

export const useEquipes = ({
  advancedSearch,
  API_Instance,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 9999,
  empresaAnoFiscalId,
}: IUseEquipes) => {
  const payload = {
    advancedSearch: [advancedSearch ? { ...advancedSearch } : {}],
    keyword,
    orderBy,
    pageNumber,
    pageSize,
    empresaAnoFiscalId,
  };

  return useQuery(
    ['equipes', `equipes-quadroId-1`, `ano-fiscal-id-${empresaAnoFiscalId}`],
    async () => {
      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IEquipe[]>
      >('producoes/equipes/listar', payload);

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
};
