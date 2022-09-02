export interface IEquipe {
  id: number;
  modulo: number;
  nome: string;
  comentario: string;
  ativo: boolean;
  responsavelId: number;
}

export interface IQuadro {
  ativo: boolean;
  comentario: string;
  id: number;
  modulo: number;
  nome: string;
  usaTransicao: boolean;
  equipes: IEquipe[];
}

export interface IStatus {
  id: number;
  nome: string;
  ordem: number;
  quadro: IQuadro;
  quadroId: number;
  tipo: number;
}

export interface ITema {
  id: number;
  quadroID: number;
  codigo: string;
  nome: string;
  comentario: string;
  inicioValidade: string;
  terminoValidade: string;
  ativo: boolean;
}
