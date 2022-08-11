import { useMutation, useQuery } from '@tanstack/react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import { IAPIPaginatedResponse, IMutationParams, IQueryParams } from '+/types';
import { IContrato } from '+/types/models/faturamento';

interface UseContratosProps extends IQueryParams<keyof IContrato> {
  empresaId: number;
}

export type CreateContratoValues = {
  checkListPendente: boolean;
  checkListRealizadoEm: string;
  condicaoPagamentoId: number;
  contratanteId: number;
  dataReajuste: string;
  descricaoAdicional: string;
  diaFaturamento: number;
  diasRestanteContrato: number;
  diasRestanteExecucao: number;
  diasTotalContrato: number;
  diasTotalExecucao: number;
  empresaResponsavelId: number;
  indiceReajusteId: number;
  inicioContrato: string;
  inicioExecucao: string;
  modalidadeContratoId: number;
  modeloGestaoContrato: number;
  numero: string;
  numeroProcesso: string;
  objetoContrato: string;
  observacao: string;
  percentualAditivo: number;
  percentualRetencao: number;
  possuiRetencao: boolean;
  propostaId: number;
  responsavelCheckListId: number;
  responsavelId: number;
  situacaoContrato: number;
  terminoContrato: string;
  terminoExecucao: string;
  tipoAditivo: number;
  tipoContratoId: number;
  tipoLiberacaoOrdemFaturamento: number;
  unidadeNegocioResponsavelId: number;
  valorAditado: number;
  valorAditivo: number;
  valorFaturado: number;
  valorOriginal: number;
  valorQuitado: number;
  valorRetencao: number;
  valorTotal: number;
  versao: number;
};

export const useContratos = ({
  advancedSearch,
  API_Instance,
  empresaId,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
}: UseContratosProps) => {
  return useQuery(
    [
      'contratos',
      `empresaId-${empresaId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      if (empresaId <= 0) return null;

      const payload = {
        advancedSearch,
        empresaId,
        keyword,
        orderBy,
        pageNumber,
        pageSize,
      };

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IContrato[]>
      >('faturamentos/contratos/listar', payload);

      return data;
    }
  );
};

export const useContratoMutation = ({
  axiosInstance,
  onError,
  onSuccess,
  queryClient,
  values,
  ...rest
}: IMutationParams<CreateContratoValues>) =>
  useMutation(() => axiosInstance.post('faturamentos/contratos', values), {
    ...rest,
    onError,
    onSettled: async () => queryClient.invalidateQueries(['contratos']),
    onSuccess,
  });
