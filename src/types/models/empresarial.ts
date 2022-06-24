export interface IAgrupador {
  id: number;
  planoId: number;
  superiorId: number;
  codigo: string;
  nome: string;
  descricao: string;
  inicioValidade: string;
  terminoValidade: string;
  nivel: number;
  analitico: boolean;
  ativo: boolean;
  subordinadas: string[];
}

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

export interface IContaOrcamentaria {
  id: number;
  planoContaOrcamentariaId: number;
  superiorId: number;
  codigo: string;
  codigoReduzido: string;
  codigoMascara: string;
  nome: string;
  descricao: string;
  origemValorConta: number;
  tipoValorConta: number;
  origemConta: number;
  naturezaContaId: number;
  agrupadorContaOrcamentariaId: number;
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

export interface IEmpresa {
  id: number;
  codigo: string;
  nome: string;
  situacao: string;
}

export interface IEmpresaAnoFiscal {
  id: number;
  empresaId: number;
  ano: number;
  planoUnidadeId: number;
  planoCentroId: number;
  planoProdutoId: number;
  planoContaOrcamentariaId: number;
  planoContaContabilId: number;
  planoContaFluxoId: number;
  configOrcamento: {
    mesAberto: number;
    situacao: number;
  };
}

export interface INaturezaConta {
  id: number;
  superiorId: number;
  codigo: string;
  nome: string;
  descricao: string;
  origemConta: number;
  inicioValidade: string;
  terminoValidade: string;
  nivel: number;
  analitico: boolean;
  ativo: boolean;
  subordinadas: string[];
}

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
  id: number;
  planoId: number;
  superiorId: number;
  codigo: string;
  nome: string;
  codigoReduzido: string;
  codigoMascara: string;
  descricao: string;
  responsavelId: number;
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
  subordinadas: string[];
}

export interface IUnidadeCentro {
  id: number;
  empresaAnoFiscalId: number;
  unidadeNegocioId: number;
  unidadeId: number;
  centroId: number;
  responsavelId: number;
  compartilhado: boolean;
  inicioValidade: string;
  terminoValidade: string;
  ativo: boolean;
}

export interface IUnidadeNegocio {
  id: number;
  empresaId: number;
  codigo: string;
  sigla: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  inscricaoEstadual: string;
  inscricaoMunicipal: string;
  incentivadorCultural: boolean;
  incentivoFiscal: boolean;
  regimeTributario: number;
  regimeTributarioEspecial: number;
  atividadeEconomicaId: number;
  naturezaJuridicaId: number;
  certificadoDigitalId: number;
  responsavelId: number;
  cep: string;
  tipoLogradouroId: number;
  logradouro: string;
  numero: string;
  complemento: string;
  pontoReferencia: string;
  tipoBairroId: number;
  bairroId: number;
  municipioId: number;
  estadoId: number;
  paisId: number;
  lat: number;
  long: number;
  codigoOrquestra: number;
}
