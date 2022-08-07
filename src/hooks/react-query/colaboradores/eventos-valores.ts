import { useQuery } from '@tanstack/react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  ENivelValorizacaoEvento,
  ETipoListagemEventoValor,
  IAPIPaginatedResponse,
  IEventoValor,
  IQueryParams,
} from '+/types';

interface Props extends IQueryParams<keyof IEventoValor> {
  empresaAnoFiscalId: number;
  eventoId?: number;
  nivelValorizacaoEvento: ENivelValorizacaoEvento;
  planejamentoColaboradorId?: number;
  tipoListagemEventoValor: ETipoListagemEventoValor;
}

export const useEventosValores = ({
  advancedSearch,
  API_Instance,
  empresaAnoFiscalId,
  eventoId,
  keyword,
  nivelValorizacaoEvento,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
  planejamentoColaboradorId,
  tipoListagemEventoValor,
}: Props) => {
  return useQuery(
    [
      'eventos-valores',
      `empresaAnoFiscalId-${empresaAnoFiscalId}`,
      `eventoId-${eventoId}`,
      `nivelValorizacaoEvento-${nivelValorizacaoEvento}`,
      `planejamentoColaboradorId-${planejamentoColaboradorId}`,
      `tipoListagemEventoValor-${tipoListagemEventoValor}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const payload = {
        advancedSearch,
        empresaAnoFiscalId,
        eventoId,
        keyword,
        nivelValorizacaoEvento,
        orderBy,
        pageNumber,
        pageSize,
        planejamentoColaboradorId,
        tipoListagemEventoValor,
      };

      if (empresaAnoFiscalId <= 0) return null;

      switch (tipoListagemEventoValor) {
        case ETipoListagemEventoValor.Colaborador: {
          if (!planejamentoColaboradorId || planejamentoColaboradorId <= 0)
            return null;

          break;
        }

        case ETipoListagemEventoValor.Evento: {
          if (!eventoId || eventoId <= 0) return null;

          break;
        }

        default: {
          break;
        }
      }

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IEventoValor[]>
      >('colaboradores/eventos-valores/listar', payload);

      return data;
    }
  );
};
