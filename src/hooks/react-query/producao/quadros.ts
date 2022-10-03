import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib/formatters';
import { IQuadro, IQueryParams, TSelectOption } from '+/types';
import { IAPIPaginatedResponse } from '+/types/axios';

interface IUseQuadros extends IQueryParams<keyof IQuadro> {
  empresaAnoFiscalId: number;
  modulo?: number;
}

export const useQuadros = ({
  advancedSearch,
  API_Instance,
  empresaAnoFiscalId,
  keyword,
  modulo = -1,
  orderBy,
  pageNumber = 1,
  pageSize = 100000,
}: IUseQuadros) => {
  return useQuery(
    [
      'quadros',
      `empresaAnoFiscalId-${empresaAnoFiscalId}`,
      `modulo-${modulo}`,
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
      };

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IQuadro[]>
      >('producoes/quadros/listar', payload);

      if (modulo >= 0)
        data.data = data.data.filter(
          quadro => Number(quadro.modulo) === Number(modulo)
        );

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    },
    { enabled: empresaAnoFiscalId > 0 }
  );
};
