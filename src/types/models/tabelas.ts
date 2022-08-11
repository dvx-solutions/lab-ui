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
