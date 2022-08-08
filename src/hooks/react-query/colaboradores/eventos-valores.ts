import { useQuery } from '@tanstack/react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  ENivelValorizacaoEvento,
  ETipoListagemEventoValor,
  IAPIPaginatedResponse,
  IAPIResponse,
  IEventoValor,
  IQueryParams,
} from '+/types';

interface IUseEventosValoresProps extends IQueryParams<keyof IEventoValor> {
  empresaAnoFiscalId: number;
  eventoId?: number;
  nivelValorizacaoEvento: ENivelValorizacaoEvento;
  planejamentoColaboradorId?: number;
  tipoListagemEventoValor: ETipoListagemEventoValor;
}

interface IUseEventosValoresPorIdProps
  extends IQueryParams<keyof IEventoValor> {
  id: number;
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
}: IUseEventosValoresProps) => {
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

export const useEventosValoresPorId = ({
  API_Instance,
  id,
}: IUseEventosValoresPorIdProps) => {
  return useQuery(['eventos-valores', `id-${id}`], async () => {
    if (id <= 0) return null;

    const { data } = await API_Instance.get<IAPIResponse<IEventoValor>>(
      `colaboradores/eventos-valores/${id}`
    );

    return data;
  });
};
