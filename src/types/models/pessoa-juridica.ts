export type TContato = {
  id: number;
  pessoaId: number;
  cargoContatoId: number;
  nome: string;
  dataNascimento: string;
  observacao: string;
};

export type TSocio = {
  id: number;
  pessoaId: number;
  nome: string;
  tipo: string;
  numeroDocumento: string;
  dataEntrada: string;
  qualificacao: string;
};

export type TEndereco = {
  id: number;
  pessoaId: number;
  tipoEndereco: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  nomeBairro: string;
  nomeMunicipio: string;
  nomeEstado: string;
  nomePais: string;
  ativo: boolean;
  principal: boolean;
  pontoReferencia: string;
  tipoLogradouroId: number;
  bairroId: number;
  municipioId: number;
  estadoId: number;
  paisId: number;
};

export interface IPessoaJuridica {
  id: number;
  tipoPessoa: string;
  codigo: string;
  nome: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  matrizFilial: string;
  inscricaoEstadual: string;
  inscricaoMunicipal: string;
  regimeTributario: string;
  naturezaJuridicaId: number;
  porteEstabelecimento: string;
  porteReceita: string;
  quantidadeEmpregados: number;
  quantidadeTerceirizados: number;
  industria: false;
  contribuinte: string;
  baseNacional: false;
  sesmt: false;
  oferecePlanoSaude: false;
  resumoExecutivo: string;
  grauRiscoSaude: number;
  enderecos: TEndereco[];
  contatos: TContato[];
  socios: TSocio[];
  atividadesEconomicas: [];
}
