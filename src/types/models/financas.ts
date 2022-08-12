export interface ITipoOrdem {
  ativo: boolean;
  codigo: string;
  comentario: string;
  contaFluxoId: number;
  contaMovimentoId: number;
  convenioCobrancaId: number;
  formaPagamentoId: number;
  historicoPadraoId: number;
  id: number;
  inicioValidade: string;
  localPagamentoId: number;
  naturezaOrdem: number;
  nome: string;
  terminoValidade: string;
}
