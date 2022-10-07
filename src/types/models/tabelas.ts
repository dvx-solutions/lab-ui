export interface ITabelaBasica {
  ativo: boolean;
  codigo: string;
  id: number;
  inicioValidade: string;
  nome: string;
  terminoValidade: string;
}

export interface IAtividadeEconomica {
  id: number;
  codigo: string;
  nome: string;
  nivelHierarquia: number;
  divisao: string;
  grupo: string;
  classe: string;
  subClasse: string;
  grauRisco: number;
  inicioValidade: string;
  terminoValidade: string;
  ativo: boolean;
}

export interface INaturezaJuridica {
  codigo: string;
  nome: string;
  inicioValidade: string;
  terminoValidade: string;
  ativo: boolean;
  id: number;
}

export interface ICondicaoPagamento {
  ativo: boolean;
  codigo: string;
  comentario: string;
  diaVencimento: number;
  id: number;
  inicioValidade: string;
  nome: string;
  permiteAdiantamento: boolean;
  quantidadeParcelas: number;
  terminoValidade: string;
  tipoData: number;
  tipoUtilizacao: number;
  utilizaParcelasIguais: boolean;
}

export interface IIndice {
  ativo: boolean;
  codigo: string;
  codigoIso: string;
  codigoSiscomex: string;
  id: number;
  inicioValidade: string;
  nome: string;
  periodicidadeIndice: number;
  terminoValidade: string;
  tipoIndice: number;
}

export interface ICodigoTributacaoMunicipio {
  aliquota: number;
  ativo: boolean;
  codigo: string;
  codigoServicoMunicipioId: number;
  descricao: string;
  id: number;
  nome: string;
}

export interface IMunicipio {
  estadoId: number;
  regiaoEstadoId: number;
  codigoIbge: string;
  nome: string;
  sigla: string;
  ddd: string;
  inicioValidade: string;
  terminoValidade: string;
  ativo: boolean;
  id: number;
}
