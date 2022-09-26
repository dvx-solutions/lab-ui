import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  IBodyRequest,
  IColaboradorMovimentacao,
  IQueryParams,
} from '+/types';

interface IUseColaboradorMovimentacao
  extends IQueryParams<keyof IColaboradorMovimentacao> {
  identificadorMovimentacao?: IColaboradorMovimentacao['identificadorMovimentacao'];
  planejamentoColaboradorId: number;
}

export const useColaboradorMovimentacao = ({
  advancedSearch,
  API_Instance,
  identificadorMovimentacao,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
  planejamentoColaboradorId,
}: IUseColaboradorMovimentacao) => {
  const payload = {
    advancedSearch,
    identificadorMovimentacao,
    keyword,
    orderBy,
    pageNumber,
    pageSize,
    planejamentoColaboradorId,
  } as IBodyRequest;

  return useQuery(
    [
      'colaborador-movimentacao',
      `identificadorMovimentacao-${identificadorMovimentacao}`,
      `planejamento-colaborador-id-${planejamentoColaboradorId}`,
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
