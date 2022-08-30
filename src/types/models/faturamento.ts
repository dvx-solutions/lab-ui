import { ITabelaPreco } from '..';

import { IColaborador } from './colaboradores';
import { IEmpresa, IUnidadeNegocio } from './empresarial';
import { IOcorrencia, ITipoOcorrencia } from './ocorrencias';
import { IPessoaFisica, IPessoaJuridica } from './pessoas';
import { IStatus } from './producao';
import { ICondicaoPagamento, IIndice } from './tabelas';

export interface IContrato {
  checkListPendente: boolean;
  checkListRealizadoEm: string;
  codigoCondicaoPagamento: string;
  codigoContratante: string;
  codigoEmpresaResponsavel: string;
  codigoIndiceReajuste: string;
  codigoModalidadeContrato: string;
  codigoResponsavel: string;
  codigoResponsavelCheckList: string;
  codigoTipoContrato: string;
  codigoUnidadeNegocioResponsavel: string;
  condicaoPagamentoId: number;
  contratanteId: number;
  dataReajuste: string;
  descricaoAdicional: string;
  diaFaturamento: number;
  diasRestanteContrato: number;
  diasRestanteExecucao: number;
  diasTotalContrato: number;
  diasTotalExecucao: number;
  empresaResponsavelId: number;
  id: number;
  indiceReajusteId: number;
  inicioContrato: string;
  inicioExecucao: string;
  modalidadeContratoId: number;
  modeloGestaoContrato: number;
  nomeCondicaoPagamento: string;
  nomeContratante: string;
  nomeEmpresaResponsavel: string;
  nomeFantasiaUnidadeNegocioResponsavel: string;
  nomeIndiceReajuste: string;
  nomeModalidadeContrato: string;
  nomeResponsavel: string;
  nomeResponsavelCheckList: string;
  nomeTipoContrato: string;
  numero: string;
  numeroProcesso: string;
  objetoContrato: string;
  observacao: string;
  percentualAditivo: number;
  percentualRetencao: number;
  possuiRetencao: boolean;
  propostaId: number;
  responsavelCheckListId: number;
  responsavelId: number;
  situacaoContrato: number;
  terminoContrato: string;
  terminoExecucao: string;
  tipoAditivo: number;
  tipoContratoId: number;
  tipoLiberacaoOrdemFaturamento: number;
  unidadeNegocioResponsavelId: number;
  valorAditado: number;
  valorAditivo: number;
  valorFaturado: number;
  valorOriginal: number;
  valorQuitado: number;
  valorRetencao: number;
  valorTotal: number;
  versao: number;
}

export interface ITipoContrato {
  ativo: boolean;
  codigo: string;
  id: number;
  inicioValidade: string;
  nome: string;
  pagamentoContrato: number;
  terminoValidade: string;
  tipoOrdemId: number;
}

export interface ITipoProposta {
  ativo: boolean;
  codigo: string;
  id: number;
  inicioValidade: string;
  nome: string;
  terminoValidade: string;
  tipoOcorrenciaCancelamento: ITipoOcorrencia;
  tipoOcorrenciaCancelamentoId: number;
}

export interface IPropostaItem {
  beneficiadoId: number;
  descricao: string;
  empresaAnoFiscalId: number;
  empresaExecutoraId: number;
  id: number;
  localExecucao: number;
  percentualDesconto: number;
  produtoComboId: number;
  produtoCustomizado: boolean;
  produtoId: number;
  propostaId: number;
  quantidade: number;
  seq: number;
  tabelaPrecoProdutoId: number;
  unidadeNegocioExecutoraId: number;
  valorDesconto: number;
  valorLiquido: number;
  valorTotal: number;
  valorUnitario: number;
}

export interface IProposta {
  agenteComercial: IColaborador;
  agenteComercialId: number;
  baseNacional: boolean;
  condicaoPagamento: ICondicaoPagamento;
  condicaoPagamentoId: number;
  contratante: IPessoaJuridica;
  contratanteId: number;
  dataReajuste: string;
  dataValidade: string;
  descricao: string;
  empresaResponsavel: IEmpresa;
  empresaResponsavelId: number;
  fluxo: string;
  id: number;
  indiceReajuste: IIndice;
  indiceReajusteId: number;
  instancia: string;
  itens: IPropostaItem[];
  motivoCancelamentoProposta: string;
  numero: string;
  observacao: string;
  ocorrencias: IOcorrencia[];
  papelRegional: number;
  regionalCoordenadorTecnico: IPessoaFisica;
  regionalCoordenadorTecnicoId: number;
  situacaoProposta: number;
  status: IStatus;
  statusId: number;
  tabelaPreco: ITabelaPreco;
  tabelaPrecoId: number;
  tipoProposta: ITipoProposta;
  tipoPropostaId: number;
  titulo: string;
  unidadeNegocioResponsavel: IUnidadeNegocio;
  unidadeNegocioResponsavelId: number;
  valorDesconto: number;
  valorDespesasOperacionais: number;
  valorLiquido: number;
  valorTotalItens: number;
  versao: number;
}

export interface IContratoChecklist {
  ativo: boolean;
  codigo: string;
  descricao: string;
  id: number;
  nome: string;
}

export interface IContratoDescritivo {
  contratoId: number;
  contratoItemId: number;
  id: number;
  nivelDescritivoContrato: number;
  texto: string;
  tipoContratoTipoDescritivoId: number;
}

export interface ITiposContratosTiposDescritivos {
  ativo: boolean;
  descricao: string;
  id: number;
  inicioValidade: string;
  nome: string;
  obrigatorio: boolean;
  sequencia: number;
  terminoValidade: string;
  tipoContratoId: number;
}
