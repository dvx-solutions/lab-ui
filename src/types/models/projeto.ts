export interface IProjeto {
  id: number;
  empresaId: number;
  responsavelId: number;
  responsavelCheckListId: number;
  codigo: string;
  nome: string;
  descricao: string;
  situacaoProjeto: string;
  dataInicioPrevisto: string;
  dataTerminoPrevisto: string;
}

export interface IProjetoAtividade {
  id: number;
  projetoId: number;
  superiorId: number;
  responsavelId: number;
  codigo: string;
  titulo: string;
  descricao: string;
  seq: number;
  nivel: number;
  analitico: boolean;
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
  situacao: string;
  subordinadas: string[];
}

export interface IProjetoDescritivo {
  projetoId: number;
  tipoProjetoTipoDescritivoId: number;
  texto: string;
}

export interface IProjetoParticipante {
  projetoId: number;
  recursoId: number;
  pessoaId: number;
  tipoParticipacaoProjeto: string;
  origemParticipacaoProjeto: string;
  rensponsabilidade: string;
  unidadeExecutora: boolean;
  principal: boolean;
  id: number;
}

export interface IProjetoProduto {
  id: number;
  projetoAtividadeId: number;
  codigo: string;
  titulo: string;
  descricao: string;
}
