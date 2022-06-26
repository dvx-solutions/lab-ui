export interface ICargo {
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
  ativo: boolean;
  codigo: string;
  empresaId: number;
  id: number;
  inicioValidade: string;
  nome: string;
  terminoValidade: string;
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
