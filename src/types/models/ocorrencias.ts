export interface ITipoOcorrencia {
  canalNotificacao: number;
  codigo: string;
  id: number;
  modulo: number;
  naturezaOcorrencia: number;
  nome: string;
  origemOcorrencia: number;
  quadroId: number;
  templateNotificacaoId: number;
  tipoDestinatario: number;
  tipoGatilho: number;
}

export interface IOcorrencia {
  codigo: string;
  colaboradorId: number;
  contatoId: number;
  conteudo: string;
  contratoId: number;
  dataOcorrencia: string;
  horaInicio: string;
  horaTermino: string;
  id: number;
  pessoaId: number;
  propostaId: number;
  situacao: number;
  tipoOcorrenciaId: number;
  titulo: string;
}
