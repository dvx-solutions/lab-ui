/* eslint-disable no-use-before-define */
import { IEmpresa, IEmpresaAnoFiscal } from './empresarial';

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
  origemPrevisao: number;
  origemRealizacao: number;
}

export interface IPlanejamentoColaborador {
  cargaHoraria: number;
  cargoId: number;
  classeCargoId: number;
  codigo: string;
  dataEntrada: string;
  empresaAnoFiscalId: number;
  funcaoConfiancaId: number;
  id: number;
  nome: string;
  novoColaborador: boolean;
  tipoVinculo: number;
  valorHora: number;
  valorMensal: number;
}

export interface IEventoValor {
  planejamentoColaborador: IPlanejamentoColaborador;
  empresa: IEmpresa;
  empresaAnoFiscal: IEmpresaAnoFiscal;
  empresaAnoFiscalId: number;
  empresaId: number;
  evento: IEvento;
  eventoId: number;
  id: number;
  mes: number;
  recursoId: number;
  valorPrevisto: {
    ValorPrevisto01: number;
    ValorPrevisto02: number;
    ValorPrevisto03: number;
    ValorPrevisto04: number;
    ValorPrevisto05: number;
    ValorPrevisto06: number;
    ValorPrevisto07: number;
    ValorPrevisto08: number;
    ValorPrevisto09: number;
    ValorPrevisto10: number;
    ValorPrevisto11: number;
    ValorPrevisto12: number;
  };
  valorReal: {
    ValorReal01: number;
    ValorReal02: number;
    ValorReal03: number;
    ValorReal04: number;
    ValorReal05: number;
    ValorReal06: number;
    ValorReal07: number;
    ValorReal08: number;
    ValorReal09: number;
    ValorReal10: number;
    ValorReal11: number;
    ValorReal12: number;
  };
  valorRevisto: {
    ValorRevisto01: number;
    ValorRevisto02: number;
    ValorRevisto03: number;
    ValorRevisto04: number;
    ValorRevisto05: number;
    ValorRevisto06: number;
    ValorRevisto07: number;
    ValorRevisto08: number;
    ValorRevisto09: number;
    ValorRevisto10: number;
    ValorRevisto11: number;
    ValorRevisto12: number;
  };
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
  cargos: ICargo[];
  classes: IClasseCargo[];
  codigo: string;
  empresaId: number;
  id: number;
  inicioValidade: string;
  nome: string;
  quantidadeClasses: number;
  terminoValidade: string;
}
