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

export interface IContaFluxo {
  analitico: boolean;
  ativo: boolean;
  codigo: string;
  codigoMascara: string;
  codigoNivel1: string;
  codigoNivel2: string;
  codigoNivel3: string;
  codigoNivel4: string;
  codigoNivel5: string;
  codigoReduzido: string;
  descricao: string;
  id: number;
  inicioValidade: string;
  natureza: number;
  nivel: number;
  nome: string;
  nomeNivel1: string;
  nomeNivel2: string;
  nomeNivel3: string;
  nomeNivel4: string;
  nomeNivel5: string;
  planoId: number;
  superiorId: number;
  terminoValidade: string;
}

export interface IContaMovimento {
  contaCorrenteId: number;
  dataAbertura: string;
  dataEncerramento: string;
  digitoContaCorrente: string;
  encerrada: boolean;
  id: number;
  numeroContaCorrente: string;
}
