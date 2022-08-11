import { useQuery } from '@tanstack/react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  IEmpresaAnoFiscal,
  IQueryParams,
  TSelectOption,
} from '+/types';

interface Props extends IQueryParams<keyof IEmpresaAnoFiscal> {
  empresaId: number;
}

export const useEmpresasAnosFiscais = ({
  advancedSearch,
  API_Instance,
  empresaId,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
}: Props) => {
  return useQuery(
    [
      'empresas-anos-fiscais',
      `empresaId-${empresaId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      if (empresaId <= 0) return null;

      const payload = {
        advancedSearch,
        keyword,
        orderBy,
        pageNumber,
        pageSize,
      };

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IEmpresaAnoFiscal[]>
      >('empresarial/empresas-anos-fiscais/listar', payload);

      data.data = data.data.filter(x => x.empresaId === empresaId);

      const options: TSelectOption[] = data.data.map(x => ({
        text: x.ano.toString(),
        value: x.id,
      }));

      return { ...data, options };
    }
  );
};
