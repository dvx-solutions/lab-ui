/* eslint-disable no-use-before-define */
import { EOrigemValorEvento, TDTOSimples } from '../index';
import {
  ICentro,
  IEmpresa,
  IUnidade,
  IUnidadeCentro,
  IUnidadeNegocio,
} from './empresarial';

export interface ICargo {
  ativo: boolean;
  codigo: string;
  docente: boolean;
  empresaId: number;
  funcaoConfianca: boolean;
  grupoCargo: IGrupoCargo;
  grupoCargoId: number;
  id: number;
  inicioValidade: string;
  nivelCargo: number;
  nome: string;
  terminoValidade: string;
  tipoCargo: number;
}

export type TCargoWithoutGrupoCargo = Omit<ICargo, 'grupoCargo'>;

export interface IClasseCargo {
  ativo: boolean;
  codigo: string;
  docente: boolean;
  empresaId: number;
  funcaoConfianca: boolean;
  grupoCargoId: number;
  id: number;
  inicioValidade: string;
  nivelCargo: number;
  nome: string;
  terminoValidade: string;
  tipoCargo: number;
}

export interface IColaborador {
  cargaHoraria: number;
  cargo: ICargo;
  cargoId: number;
  classeCargoId: number;
  codigo: string;
  cpf: string;
  dataEntrada: string;
  dataNascimento: string;
  dataSaida: string;
  email: string;
  empresaId: number;
  funcaoConfiancaId: number;
  id: number;
  matricula: string;
  nome: string;
  situacao: number;
  tipoVinculo: number;
  valorHora: number;
  valorMensal: number;
}

export interface IEvento {
  codigo: string;
  codigoEventoFolha: string;
  descricao: string;
  empresaId: number;
  formulaCalculo: string;
  formulaInterna: string;
  id: number;
  nivelValorizacao: number;
  nome: string;
  origemEvento: EOrigemValorEvento;
  origemRealizacao: number;
}

export interface IRateioPlanejamentoColaborador {
  centro: ICentro;
  centroId: number;
  mes: number;
  percentualPrevisto: number;
  percentualReal: number;
  percentualRevisto: number;
  tipoLotacaoColaborador: number;
  unidade: IUnidade;
  unidadeCentro: IUnidadeCentro;
  unidadeCentroId: number;
  unidadeId: number;
  unidadeNegocio: IUnidadeNegocio;
  unidadeNegocioId: number;
}

export interface IPlanejamentoColaborador {
  cargaHoraria: number;
  cargo: ICargo;
  cargoId: number;
  centroId: number;
  classeCargo: IClasseCargo;
  classeCargoId: number;
  codigo: string;
  colaborador: IColaborador;
  colaboradorId: number;
  dataEntrada: string;
  dataSaida: string;
  empresaAnoFiscalId: number;
  funcaoConfianca: IFuncaoConfianca;
  funcaoConfiancaId: number;
  id: number;
  mensagemProcessamento: string;
  nome: string;
  processaOrcamento: true;
  rateios: IRateioPlanejamentoColaborador[];
  setor: ISetor;
  setorId: number;
  situacao: number;
  statusProcessamento: number;
  tipoVinculo: number;
  unidadeCentroId: number;
  unidadeId: number;
  unidadeNegocio: IUnidadeNegocio;
  unidadeNegocioId: number;
  valorHora: number;
  valorMensal: number;
}

export interface IEventoValor {
  codigoEmpresa: string;
  codigoEvento: string;
  codigoPlanejamentoColaborador: string;
  empresaAnoFiscalId: number;
  empresaId: number;
  eventoId: number;
  id: number;
  nivelValorizacao: number;
  nomeEmpresa: string;
  nomeEvento: string;
  nomePlanejamentoColaborador: string;
  origemEvento: number;
  planejamentoColaboradorId: number;
  tipoValorEvento: number;
  cargoId: number;
  classeCargoId: number;
  codigoCargo: string;
  codigoClasseCargo: string;
  nomeCargo: string;
  tipoCargo: number;
  tipoVinculo: number;
  valor01: number;
  valor02: number;
  valor03: number;
  valor04: number;
  valor05: number;
  valor06: number;
  valor07: number;
  valor08: number;
  valor09: number;
  valor10: number;
  valor11: number;
  valor12: number;
  valorAnual: number;
}

export interface IFuncaoConfianca {
  id: number;
  empresaId: number;
  codigo: string;
  nome: string;
  inicioValidade: string;
  terminoValidade: string;
  ativo: boolean;
}

export interface IGrupoCargo {
  ativo: boolean;
  cargaHoraria: number;
  cargos: TCargoWithoutGrupoCargo[];
  classes: IClasseCargo[];
  codigo: string;
  empresaId: number;
  id: number;
  inicioValidade: string;
  nome: string;
  quantidadeClasses: number;
  terminoValidade: string;
  tipoCargo: number;
}

export interface ISetor {
  ativo: boolean;
  codigo: string;
  empresa: IEmpresa;
  empresaId: number;
  id: number;
  inicioValidade: string;
  nome: string;
  terminoValidade: string;
}

export interface IColaboradorMovimentacao {
  cargaHoraria: number;
  cargo: TDTOSimples;
  cargoId: number;
  centro: TDTOSimples;
  centroId: number;
  classeCargo: TDTOSimples;
  classeCargoId: number;
  colaborador: TDTOSimples;
  colaboradorId: number;
  dataMovimentacao: string;
  descricao: string;
  funcaoConfianca: TDTOSimples;
  funcaoConfiancaId: number;
  id: number;
  identificadorMovimentacao: string;
  origemMovimentacao: number;
  percentual: number;
  planejamentoColaborador: TDTOSimples;
  planejamentoColaboradorId: number;
  processoId: number;
  setor: TDTOSimples;
  setorId: number;
  tipoMovimentacao: number;
  unidade: TDTOSimples;
  unidadeCentro: TDTOSimples;
  unidadeCentroId: number;
  unidadeId: number;
  unidadeNegocio: Omit<TDTOSimples, 'nome'> & {
    nomeFantasia: string;
  };
  unidadeNegocioId: number;
}

export interface ITabelaSalario {
  cargoId: number;
  classeCargoId: number;
  codigoCargo: string;
  codigoClasseCargo: string;
  codigoEmpresa: string;
  codigoGrupoCargo: string;
  empresaAnoFiscalId: number;
  empresaId: number;
  grupoCargoId: number;
  id: number;
  nomeCargo: string;
  nomeEmpresa: string;
  nomeGrupoCargo: string;
  origemSalario: number;
  valor01: number;
  valor02: number;
  valor03: number;
  valor04: number;
  valor05: number;
  valor06: number;
  valor07: number;
  valor08: number;
  valor09: number;
  valor10: number;
  valor11: number;
  valor12: number;
  valorAnual: number;
}
