export interface IContrato {
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
  id: number;
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
}

export interface ITipoContrato {
  ativo: boolean;
  codigo: string;
  id: number;
  inicioValidade: string;
  nome: string;
  pagamentoContrato: number;
  terminoValidade: string;
  tipoOrdemId: number;
}
