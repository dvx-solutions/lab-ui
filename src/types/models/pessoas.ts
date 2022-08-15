export type TEmail = {
  ativo: boolean;
  email: string;
  principal: boolean;
  tipoEmail: number;
};

export type TTelefone = {
  ativo: boolean;
  ddd: string;
  ddi: string;
  enviarSMS: boolean;
  numero: string;
  possuiTelegram: boolean;
  possuiWhatsapp: boolean;
  principal: boolean;
  tipoTelefone: number;
};

export interface IPessoaAtividadeEconomica {
  atividadeEconomicaId: number;
  id: number;
  pessoaId: number;
  principal: boolean;
}

export interface IPessoaSocio {
  dataEntrada: string;
  id: number;
  nome: string;
  numeroDocumento: string;
  pessoaId: number;
  qualificacao: string;
  tipo: string;
  tipoDocumento: string;
}

export interface IPessoaContato {
  areaContatoId: number;
  cargoContatoId: number;
  dataNascimento: string;
  emails: TEmail[];
  id: number;
  nome: string;
  observacao: string;
  pessoaId: number;
  telefones: TTelefone[];
}

export interface IPessoaEndereco {
  ativo: boolean;
  bairroId: number;
  cep: string;
  codigoTipoBairro: string;
  codigoTipoLogradouro: string;
  complemento: string;
  estadoId: number;
  id: number;
  logradouro: string;
  municipioId: number;
  nomeBairro: string;
  nomeEstado: string;
  nomeMunicipio: string;
  nomePais: string;
  numero: string;
  paisId: number;
  pessoaId: number;
  pontoReferencia: string;
  principal: boolean;
  tipoBairroId: number;
  tipoEndereco: string;
  tipoLogradouroId: number;
}

export interface IPessoaJuridica {
  atividadesEconomicas: IPessoaAtividadeEconomica[];
  baseNacional: boolean;
  cnpj: string;
  codigo: string;
  contatos: IPessoaContato[];
  contribuinte: number;
  emails: TEmail[];
  enderecos: IPessoaEndereco[];
  grauRiscoSaude: number;
  id: number;
  industria: boolean;
  inscricaoEstadual: string;
  inscricaoMunicipal: string;
  matrizFilial: number;
  naturezaJuridicaId: number;
  nome: string;
  nomeFantasia: string;
  oferecePlanoSaude: boolean;
  poloIndustrialId: number;
  porteEstabelecimento: number;
  porteReceita: number;
  quantidadeEmpregados: number;
  quantidadeTerceirizados: number;
  razaoSocial: string;
  regimeTributario: number;
  resumoExecutivo: string;
  sesmt: boolean;
  socios: IPessoaSocio[];
  tipoPessoa: number;
}

export interface IPessoaFisica {
  atividadeEconomicaId: number;
  codigo: string;
  contribuinte: number;
  cpf: string;
  dataEmissaoCtps: string;
  dataEmissaoRG: string;
  dataNascimento: string;
  deficiencia: number;
  genero: number;
  id: number;
  industria: boolean;
  naturalidade: string;
  nome: string;
  nomeMae: string;
  nomePai: string;
  nomeResponsavel: string;
  numeroCtps: string;
  numeroGfip: string;
  numeroNIT: string;
  numeroPisPasep: string;
  numeroRG: string;
  orgemExpeditorRG: string;
  pessoaFisicaTratadaComoJuridica: boolean;
  porte: number;
  quantidadeEmpregados: number;
  raca: number;
  serieCtps: string;
  tipoPessoa: number;
  ufCtps: string;
}
