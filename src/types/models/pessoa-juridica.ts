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

export interface IPessoaJuridicaReceita {
  cnpj_raiz: string;
  razao_social: string;
  capital_social: string;
  responsavel_federativo: string;
  atualizado_em: string;
  porte: {
    id: number;
    descricao: string;
  };
  natureza_Juridica: {
    id: number;
    descricao: string;
  };
  qualificacao_Do_Responsavel: {
    id: number;
    descricao: string;
  };
  simples: {
    simples: string;
    data_opcao_simples: string;
    data_exclusao_simples: string;
    mei: string;
    data_opcao_mei: string;
    data_exclusao_mei: string;
    atualizado_em: string;
  };
  estabelecimento: {
    cnpj: string;
    atividades_secundarias: [
      {
        id: string;
        secao: string;
        divisao: string;
        grupo: string;
        classe: string;
        subclasse: string;
        descricao: string;
      }
    ];
    cnpj_raiz: string;
    cnpj_ordem: string;
    cnpj_digito_verificador: string;
    tipo: string;
    nome_fantasia: string;
    situacao_cadastral: string;
    data_situacao_cadastral: string;
    data_inicio_atividade: string;
    nome_cidade_exterior: string;
    tipo_logradouro: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    ddd1: string;
    telefone1: string;
    ddd2: string;
    telefone2: string;
    ddd_fax: string;
    fax: string;
    email: string;
    situacao_especial: string;
    data_situacao_especial: string;
    atualizado_em: string;
    atividade_principal: {
      id: string;
      secao: string;
      divisao: string;
      grupo: string;
      classe: string;
      subclasse: string;
      descricao: string;
    };
    pais: {
      id: string;
      iso2: string;
      iso3: string;
      nome: string;
      comex_id: string;
    };
    estado: {
      id: number;
      nome: string;
      sigla: string;
      ibge_id: number;
    };
    cidade: {
      id: number;
      nome: string;
      ibge_id: number;
      siafi_id: string;
    };
    motivo_situacao_cadastral: string;
    inscricoes_estaduais: [string];
    inscricoes_suframa: [string];
    regimes_tributarios: [string];
  };
  atividade_Principal: {
    id: string;
    secao: string;
    divisao: string;
    grupo: string;
    classe: string;
    subclasse: string;
    descricao: string;
  };
  pais: {
    id: string;
    iso2: string;
    iso3: string;
    nome: string;
    comex_id: string;
  };
  estado: {
    id: number;
    nome: string;
    sigla: string;
    ibge_id: number;
  };
  cidade: {
    id: number;
    nome: string;
    ibge_id: number;
    siafi_id: string;
  };
  atividades_Secundarias: {
    id: string;
    secao: string;
    divisao: string;
    grupo: string;
    classe: string;
    subclasse: string;
    descricao: string;
  };
  socios: [
    {
      cpf_cnpj_socio: string;
      nome: string;
      tipo: string;
      data_entrada: string;
      cpf_representante_legal: string;
      nome_representante: string;
      faixa_etaria: string;
      atualizado_em: string;
      pais_id: string;
      qualificacao_socio: {
        id: number;
        descricao: string;
      };
      qualificacao_representante: string;
    }
  ];
  qualificacao_Socio: {
    id: number;
    descricao: string;
  };
}
