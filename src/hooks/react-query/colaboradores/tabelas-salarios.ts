import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import { IBodyRequest, IQueryParams, ITabelaSalario } from '+/types';

interface Props extends IQueryParams<keyof ITabelaSalario> {
  empresaAnoFiscalId: number;
  origemSalario: number;
}

export const useTabelasSalarios = ({
  advancedSearch,
  API_Instance,
  empresaAnoFiscalId,
  keyword,
  orderBy,
  origemSalario,
  pageNumber = 1,
  pageSize = 25,
}: Props) => {
  return useQuery(
    [
      'tabelas-salarios',
      `empresaAnoFiscalId-${empresaAnoFiscalId}`,
      `origemSalario-${origemSalario}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const payload = {
        advancedSearch,
        empresaAnoFiscalId,
        keyword,
        orderBy,
        origemSalario,
        pageNumber,
        pageSize,
      } as IBodyRequest;

      const { data } = await API_Instance.post(
        'colaboradores/tabelas-salarios/listar',
        payload
      );

      return data;
    }
  );
};
