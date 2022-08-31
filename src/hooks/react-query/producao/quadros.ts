import { useQuery } from '@tanstack/react-query';

import { convertAdvancedSearchToReactQueryKeys } from '+/lib/formatters';
import { IQuadro, IQueryParams, TSelectOption } from '+/types';
import { IAPIPaginatedResponse } from '+/types/axios';

interface IUseQuadros extends IQueryParams<keyof IQuadro> {
  empresaAnoFiscalId: number;
}

export const useQuadros = ({
  advancedSearch,
  API_Instance,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 9999,
  empresaAnoFiscalId,
}: IUseQuadros) => {
  const payload = {
    advancedSearch: [advancedSearch ? { ...advancedSearch } : {}],
    keyword,
    orderBy,
    pageNumber,
    pageSize,
    empresaAnoFiscalId,
  };

  return useQuery(
    ['quadros', `quadros-anoFiscalId-${empresaAnoFiscalId}`],
    async () => {
      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IQuadro[]>
      >('producoes/quadros/listar', payload);

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
};
