/* eslint-disable no-use-before-define */
export interface IAgrupador {
  analitico: boolean;
  ativo: boolean;
  codigo: string;
  descricao: string;
  id: number;
  inicioValidade: string;
  nivel: number;
  nome: string;
  planoId: number;
  subordinadas: string[];
  superiorId: number;
  terminoValidade: string;
}

export interface ICentro {
  agrupadorId: number;
  analitico: boolean;
  ativo: boolean;
  classificacaoCentro: string;
  codigo: string;
  codigoMascara: string;
  codigoNivel1: string;
  codigoNivel2: string;
  codigoNivel3: string;
  codigoNivel4: string;
  codigoNivel5: string;
  codigoReduzido: string;
  descricao: string;
  id: number;
  inicioValidade: string;
  naturezaCentro: string;
  nivel: number;
  nome: string;
  nomeNivel1: string;
  nomeNivel2: string;
  nomeNivel3: string;
  nomeNivel4: string;
  nomeNivel5: string;
  planoId: number;
  responsavelId: number;
  subordinadas: string[];
  superiorId: number;
  terminoValidade: string;
}

export interface IContaOrcamentaria {
  agrupadorContaOrcamentariaId: number;
  analitico: boolean;
  ativo: boolean;
  codigo: string;
  codigoMascara: string;
  codigoNivel1: string;
  codigoNivel2: string;
  codigoNivel3: string;
  codigoNivel4: string;
  codigoNivel5: string;
  codigoReduzido: string;
  descricao: string;
  id: number;
  inicioValidade: string;
  naturezaConta: Omit<INaturezaConta, 'contasOrcamentarias'>;
  naturezaContaId: number;
  nivel: number;
  nome: string;
  nomeNivel1: string;
  nomeNivel2: string;
  nomeNivel3: string;
  nomeNivel4: string;
  nomeNivel5: string;
  origemConta: number;
  origemValorConta: number;
  planoContaOrcamentariaId: number;
  superiorId: number;
  terminoValidade: string;
  tipoValorConta: number;
}

export interface IContaContabil {
  id: number;
  planoId: number;
  superiorId: number;
  codigo: string;
  nome: string;
  codigoReduzido: string;
  codigoMascara: string;
  descricao: string;
  origemConta: 1;
  tipoUso: number;
  tipoConta: number;
  naturezaContaId: number;
  agrupadorId: number;
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
}

export interface IEmpresa {
  codigo: string;
  compartilhada: boolean;
  id: number;
  nome: string;
  situacao: number;
  subordinadas: TEmpresaSubordinada[];
  superiorId: number;
}

type TEmpresaSubordinada = Omit<IEmpresa, 'subordinadas'>;

export interface IEmpresaAnoFiscal {
  ano: number;
  configOrcamento: { mesAberto: number; situacao: number };
  empresa: IEmpresa;
  empresaId: number;
  id: number;
  planoCentroId: number;
  planoContaContabilId: number;
  planoContaFluxoId: number;
  planoContaOrcamentariaId: number;
  planoProdutoId: number;
  planoUnidadeId: number;
}

export interface INaturezaConta {
  analitico: boolean;
  ativo: boolean;
  codigo: string;
  contasOrcamentarias: IContaOrcamentaria[];
  descricao: string;
  id: number;
  inicioValidade: string;
  nivel: number;
  nome: string;
  origemConta: number;
  subordinadas: TNaturezaContaSubordinada[];
  superiorId: number;
  terminoValidade: string;
}

type TNaturezaContaSubordinada = Omit<INaturezaConta, 'subordinadas'>;

export interface IPlano {
  id: number;
  tipoPlano: number;
  nome: string;
  mascaraConfig: {
    mascara: string;
    nivelConsolidacao: number;
    nivelMinimoAnalitico: number;
    niveis: {
      nivel: number;
      mascara: string;
      separador: string;
      inicio: number;
      tamanho: number;
      final: number;
    }[];
  };
  inicioValidade: string;
  terminoValidade: string;
  ativo: boolean;
}

export interface IUnidade {
  agrupadorId: number;
  analitico: boolean;
  ativo: boolean;
  codigo: string;
  codigoMascara: string;
  codigoNivel1: string;
  codigoNivel2: string;
  codigoNivel3: string;
  codigoNivel4: string;
  codigoNivel5: string;
  codigoReduzido: string;
  descricao: string;
  id: number;
  inicioValidade: string;
  nivel: number;
  nome: string;
  nomeNivel1: string;
  nomeNivel2: string;
  nomeNivel3: string;
  nomeNivel4: string;
  nomeNivel5: string;
  planoId: number;
  responsavelId: number;
  subordinadas: string[];
  superiorId: number;
  terminoValidade: string;
}

export interface IUnidadeCentro {
  ativo: boolean;
  centro: ICentro;
  centroId: number;
  compartilhado: boolean;
  empresaAnoFiscalId: number;
  id: number;
  inicioValidade: string;
  responsavelId: number;
  terminoValidade: string;
  unidade: IUnidade;
  unidadeId: number;
  unidadeNegocioId: number;
}

export interface IUnidadeNegocio {
  atividadeEconomicaId: number;
  bairroId: number;
  cep: string;
  certificadoDigitalId: number;
  cnpj: string;
  codigo: string;
  codigoOrquestra: number;
  complemento: string;
  empresaId: number;
  estadoId: number;
  id: number;
  incentivadorCultural: boolean;
  incentivoFiscal: boolean;
  inscricaoEstadual: string;
  inscricaoMunicipal: string;
  lat: number;
  logradouro: string;
  long: number;
  municipioId: number;
  naturezaJuridicaId: number;
  nomeFantasia: string;
  numero: string;
  paisId: number;
  pontoReferencia: string;
  razaoSocial: string;
  regimeTributario: number;
  regimeTributarioEspecial: number;
  responsavelId: number;
  sigla: string;
  tipoBairroId: number;
  tipoLogradouroId: number;
}
