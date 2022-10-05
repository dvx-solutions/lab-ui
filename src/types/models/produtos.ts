import { ITabelaBasica } from './tabelas';

export type ITabelaPreco = ITabelaBasica;

export interface IProduto {
  agrupadorId: number;
  analitico: boolean;
  ativo: boolean;
  codigo: string;
  codigoFormulario: string;
  codigoNivel1: string;
  codigoNivel2: string;
  codigoNivel3: string;
  codigoNivel4: string;
  codigoNivel5: string;
  combo: boolean;
  descricao: string;
  homologado: boolean;
  id: number;
  inicioValidade: string;
  naturezaProdutoId: number;
  nivel: number;
  nome: string;
  nomeNivel1: string;
  nomeNivel2: string;
  nomeNivel3: string;
  nomeNivel4: string;
  nomeNivel5: string;
  planoId: number;
  possuiFicha: boolean;
  superiorId: number;
  terminoValidade: string;
  tipoProdutoId: number;
  unidadeMedidaId: number;
}

export interface INaturezaProduto {
  ativo: boolean;
  codigo: string;
  descricao: string;
  id: number;
  inicioValidade: string;
  naturezaConsumo: number;
  nome: string;
  origemProduto: number;
  padraoConsumo: boolean;
  planoId: number;
  planoSmd: boolean;
  possuiMeta: boolean;
  sigla: string;
  terminoValidade: string;
}

export interface INaturezasProdutosTiposDescritivos {
  ativo: boolean;
  descricao: string;
  id: number;
  inicioValidade: string;
  naturezaProdutoId: number;
  nome: string;
  obrigatorio: boolean;
  sequencia: number;
  terminoValidade: string;

  naturezaProdutoTipoDescritivo: INaturezasProdutosTiposDescritivos;
  naturezaProdutoTipoDescritivoId: number;
  produto: IProduto;
  produtoId: number;
  texto: string;
}

export interface IProdutoDescritivo {
  id: number;
  naturezaProdutoTipoDescritivo: INaturezasProdutosTiposDescritivos;
  naturezaProdutoTipoDescritivoId: number;
  produto: IProduto;
  produtoId: number;
  texto: string;
}
