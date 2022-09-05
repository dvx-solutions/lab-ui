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

export interface IOrdemServico {
  id: number;
  tipoOrdemServicoId: number;
  codigo: string;
  titulo: string;
  descricao: string;
  seq: number;
  nivel: number;
  analitico: boolean;
  superiorId: number;
  temaId: number;
  empresaId: number;
  unidadeNegocioId: number;
  contratoItemId: number;
  propostaItemId: number;
  clienteId: number;
  contatoId: number;
  projetoAtividadeId: number;
  quadroId: number;
  statusId: number;
  tipoTerefaId: number;
  equipeId: number;
  responsavelId: number;
  dataInicioPrevisto: string;
  dataTerminoPrevisto: string;
  horaInicioPrevisto: string;
  horaTerminoPrevisto: string;
  tempoPrevisto: number;
  dataInicioRealizado: string;
  dataTerminoRealizado: string;
  horaInicioRealizado: string;
  horaTerminoRealizado: string;
  tempoRealizado: number;
  percentualExecucao: number;
  percentualPrazo: number;
  situacao: number;
}
