import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';

import { convertAdvancedSearchToReactQueryKeys } from '+/lib/formatters';
import { IQueryParams, TSelectOption } from '+/types';
import { IAPIPaginatedResponse, IBodyRequest } from '+/types/axios';
import { IUnidade } from '+/types/models/empresarial';

interface IUseUnidades extends IQueryParams<keyof IUnidade> {
  empresaAnoFiscalId: number;
  planoId: number;
}

export const useUnidades = ({
  API_Instance,
  planoId,
  advancedSearch,
  pageNumber = 1,
  empresaAnoFiscalId,
  pageSize = 9999,
}: IUseUnidades) => {
  return useQuery(
    [
      'unidades',
      `plano-id-${planoId}`,
      `empresa-ano-fiscal-${empresaAnoFiscalId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      `pageNumber-${pageNumber}`,
      `pageSize-${pageSize}`,
    ],
    async () => {
      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IUnidade[]>
      >('empresarial/unidades/listar', {
        pageNumber,
        pageSize,
        empresaAnoFiscalId,
        advancedSearch: [
          advancedSearch ? { ...advancedSearch } : {},
          { fields: ['planoId'], keyword: planoId.toString() },
        ],
      } as IBodyRequest<keyof IUnidade>);

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.codigo} - ${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
};
