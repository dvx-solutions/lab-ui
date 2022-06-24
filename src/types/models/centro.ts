export interface ICentro {
  id: number;
  planoId: number;
  superiorId: number;
  codigo: string;
  nome: string;
  codigoReduzido: string;
  codigoMascara: string;
  descricao: string;
  responsavelId: number;
  classificacaoCentro: string;
  naturezaCentro: string;
  agrupadord: number;
  nivel: number;
  analitico: boolean;
  codigoNivel1: string;
  codigoNivel2: string;
  codigoNivel3: string;
  codigoNivel4: string;
  codigoNivel5: string;
  nomeNivel1: string;
  nomeNivel2: string;
  nomeNivel3: string;
  nomeNivel4: string;
  nomeNivel5: string;
  inicioValidade: string;
  terminoValidade: string;
  ativo: boolean;
  subordinadas: string[];
}
