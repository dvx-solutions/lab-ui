export interface IQuadro {
  ativo: boolean;
  comentario: string;
  id: number;
  modulo: number;
  nome: string;
  usaTransicao: boolean;
}

export interface IStatus {
  id: number;
  nome: string;
  ordem: number;
  quadro: IQuadro;
  quadroId: number;
  tipo: number;
}
