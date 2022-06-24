export interface IRecurso {
  id: number;
  empresaId: number;
  cargoId: number;
  classeCargoId: number;
  funcaoConfiancaId: number;
  codigo: string;
  nome: string;
  email: string;
  dataNascimento: string;
  matricula: string;
  cargaHoraria: number;
  tipoVinculo: string;
  situacao: string;
  dataEntrada: string;
  dataSaida: string;
  valorMensal: number;
  valorHora: number;
}
