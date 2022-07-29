import { useQuery } from '@tanstack/react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  IColaboradorMovimentacao,
  IQueryParams,
} from '+/types';

interface IUseColaboradorMovimentacao
  extends IQueryParams<keyof IColaboradorMovimentacao> {
  colaboradorId?: number;
  planejamentoColaboradorId?: number;
}

export const useColaboradorMovimentacao = ({
  API_Instance,
  advancedSearch,
  colaboradorId,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
  planejamentoColaboradorId,
}: IUseColaboradorMovimentacao) => {
  const payload = {
    advancedSearch,
    colaboradorId,
    keyword,
    orderBy,
    pageNumber,
    pageSize,
    planejamentoColaboradorId,
  };

  return useQuery(
    [
      'colaborador-movimentacao',
      `colaboradorId-${colaboradorId}`,
      `planejamentoColaboradorId-${planejamentoColaboradorId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IColaboradorMovimentacao[]>
      >('colaboradores/colaboradores-movimentacoes/listar', payload);

      return data;
    }
  );
};
