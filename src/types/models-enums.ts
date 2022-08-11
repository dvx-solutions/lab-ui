export enum EGenero {
  'Masculino' = 0,
  'Feminino' = 1,
}

export enum ERaca {
  'Nenhuma' = 0,

  'Branca' = 1,
}

export enum EDeficiencia {
  'Nenhuma' = 0,

  'Auditiva' = 1,

  'Visual' = 2,
}

export enum EOrigemAnexo {
  'Ocorrência' = 0,

  'Pessoa' = 1,

  'Contato' = 2,

  'Contrato' = 3,

  'Proposta' = 4,

  'Projeto' = 5,

  'Ordem de Serviço' = 6,

  'Ordem' = 7,

  'Boleto' = 8,

  'Prestação Conta Projeto' = 9,
}

export enum EOrigemOcorrencia {
  'Ocorrência' = 0,

  'Pessoa' = 1,

  'Contato' = 2,

  'Contrato' = 3,

  'Proposta' = 4,

  'Projeto' = 5,

  'Ordem serviço' = 6,

  'Ordem' = 7,

  'Boleto' = 8,
}

export enum ETipoGatilho {
  'Manual' = 0,

  'Transição' = 1,

  'Agente' = 2,
}

export enum ESituacaoOcorrencia {
  'Agendada' = 0,

  'Concluída' = 1,

  'Reprogramada' = 2,

  'Cancelada' = 3,
}

export enum ETipoDestinatario {
  'Pessoa - e-mail principal' = 0,

  'Pessoa - todos e-mail(s)' = 1,

  'Contato - e-mail principal' = 2,

  'Contato - todos e-mail(s)' = 3,
}

export enum ECanalNotificacao {
  'Email' = 1,

  'Telefone' = 2,

  'SMS' = 3,

  'Whatzap' = 4,

  'Telegram' = 5,

  'Facebook' = 6,

  'Instagram' = 7,

  'Notificação push' = 8,
}

export enum ENaturezaOcorrencia {
  'Ocorrência' = 0,

  'Chat' = 1,

  'Telefonema' = 2,

  'Notificação' = 3,

  'Comentário' = 4,

  'Blog' = 5,
}

export enum EOrigemCheckList {
  'Contrato' = 1,

  'Projeto' = 2,

  'Proposta' = 3,
}

export enum ESituacaoProjeto {
  'Em Planejamento' = 1,

  'Em Execução' = 2,

  'Em Aprovação' = 3,

  'Aprovado' = 4,

  'Reprovado' = 5,

  'Cancelado' = 6,

  'Finalizado' = 7,
}

export enum ENivelDescritivoProposta {
  'Proposta' = 1,

  'Item da Proposta' = 2,
}

export enum ENivelDescritivoContrato {
  'Contrato' = 1,

  'Item do Contrato' = 2,
}

export enum ESituacaoOrcamento {
  'Em Planejamento' = 0,

  'Aprovado' = 1,
}

export enum ETipoParticipacaoProjeto {
  'Recurso Interno' = 1,

  'Recurso Externo' = 2,

  'Aprovador Interno' = 3,

  'Aprovador Externo' = 4,

  'Unidades Participantes' = 5,

  'Empresas Parceiras' = 6,
}

export enum EStatusRepasseProjeto {
  'Planejamento' = 0,

  'Execução' = 1,

  'Monitoramento' = 2,
}

export enum EClassificacaoItemPrestacaoContaProjeto {
  'Financeira' = 0,

  'Econômica' = 1,
}
export enum EClassificacaoOrcamentoProjeto {
  'Financeira' = 0,

  'Econômica' = 1,
}
export enum ESituacaoPrestacaoContaProjeto {
  'Planejada' = 0,

  'Aguardando Aprovação' = 1,

  'Aprovada' = 2,
}
export enum ESituacaoItemPrestacaoContaProjeto {
  'Planejada' = 0,

  'Aguardando Aprovação' = 1,

  'Aprovada' = 2,

  'Rejeitado' = 3,
}

export enum EMes {
  'Selecione' = 0,

  'Janeiro' = 1,

  'Fevereiro' = 2,

  'Março' = 3,

  'Abril' = 4,

  'Maio' = 5,

  'Junho' = 6,

  'Julho' = 7,

  'Agosto' = 8,

  'Setembro' = 9,

  'Outubro' = 10,

  'Novembro' = 11,

  'Dezembro' = 12,
}

export enum EFrequenciaRepasseProjeto {
  'Único' = 0,

  'Semanal' = 1,

  'Mensal' = 2,

  'Bimestral' = 3,

  'Trimestral' = 4,

  'Semestral' = 5,

  'Anual' = 6,
}

export enum EOrigemParticipacaoProjeto {
  'Recurso' = 1,

  'Pessoa' = 2,
}

export enum ESituacaoAtividadeProjeto {
  'A Programar' = 0,

  'Programada' = 1,

  'Em Andamento' = 2,

  'Concluida' = 3,

  'Adiantada' = 4,

  'Atrasada' = 5,

  'Liberada' = 6,

  'Autorizada' = 7,

  'Faturada' = 8,
}

export enum EClasseOrquestraErp {
  'Empresa' = 1,

  'Unidade Negócio' = 2,

  'Unidade' = 3,

  'Centro' = 4,

  'Conta Contábil' = 5,

  'Conta Orçamentária' = 6,

  'Pessoa' = 7,

  'Produto' = 8,
}

export enum ESituacaoBoleto {
  'Cancelado' = 0,

  'Aberto' = 1,

  'Baixado' = 2,
}

export enum ETipoMovimentacaoBoleto {
  'Registrado' = 0,

  'Baixado' = 1,

  'Revalidado' = 2,

  'Cancelado' = 4,

  'Excluido' = 5,
}

export enum EPadraoCNAB {
  'Cnab 240' = 1,

  'Cnab 400' = 2,
}

export enum ETipoCarteira {
  'Cobrança Simples' = 1,

  'Cobrança Vinculada' = 2,

  'Cobrança Caucionada' = 3,

  'Cobrança Descontada' = 4,

  'Cobrança Vendor' = 5,
}

export enum ETipoExecucao {
  'Unidade Própria' = 1,
  'Unidade Parceira' = 2,
  'Perceiro' = 3,
}

export enum ELocalExecucao {
  'Unidade' = 1,

  'Cliente' = 2,
}
export enum ESituacaoProposta {
  'Em Elaboracao' = 0,

  'Andamento' = 1,

  'Aprovada' = 2,

  'Confirmada' = 3,

  'Aceita' = 4,

  'Erros' = 5,

  'Expirada' = 6,

  'Rejeitada' = 7,
}

export enum ETipoAditivo {
  Prazo,
  Valor,
  Quantidade,
  Qualidade,
}

export enum ECriticidadeContrato {
  'AltoRisco' = 3,

  'Risco' = 2,

  'BaixoRisco' = 1,
}

export enum ETipoContratante {
  'Empresa Privada' = 1,

  'Empresa Pública' = 2,

  'Empresa Economia Mista' = 3,

  'Sistema S' = 4,

  'PessoaFisica' = 5,
}

export enum ESituacaoParcelaContrato {
  'Ativo' = 0,
}

export enum ESituacaoContrato {
  'Em Validação' = 1,
  'Em Assinatura' = 2,
  'Em Revisão' = 3,
  'Vigente' = 4,
  'Concluído' = 5,
  'Rescindido' = 6,
}

export enum EModeloGestaoContrato {
  'Faturamento Sob Demanda' = 0,
  'Faturamento Conclusão Atendimento' = 1,
  'Faturamento Antecipado' = 2,
  'Faturamento Conclusão Contrato' = 3,
}

export enum ETipoComposicaoProduto {
  'Produto Consumido' = 0,

  'Recurso Consumido' = 1,
}

export enum ESituacaoColaborador {
  Desligado = 0,
  Ativo = 1,
  Afastado = 2,
  'Férias' = 3,
}

export enum ENivelIntegracaoProjeto {
  'Projeto' = 0,
  'Etapa' = 1,
}

export enum ENivelCargo {
  'Nível médio' = 1,
  'Nível superior' = 2,
}

export enum ETipoCargo {
  'Colaborador padrão' = 1,
  'Estagiário' = 2,
  'Função de confiança' = 3,
  'Menor aprendiz' = 4,
  'Autônomo' = 5,
}

export enum ENivelValorizacaoEvento {
  'Empresa' = 1,
  'Colaborador' = 2,
}

export enum EOrigemValorEvento {
  'Não processa' = 0,
  'Manual' = 1,
  'Salario contratual' = 2,
  'Função de Confiança' = 3,
  'Periculosidade' = 4,
  'Insalubridade' = 5,
  'Bolsa estágio' = 6,
  'Evento da folha mensal' = 20,
  'Maior valor folha últimos 12 meses' = 21,
  'Média valor folha últimos 12 meses' = 22,
  'Fórmula' = 30,
}

export enum ENaturezaContaFluxo {
  'Entrada' = 0,

  'Saída' = 1,

  'transferência Entrada' = 2,

  'transferência Saída' = 3,
}

export enum ENfseAmbienteEmissao {
  'Não Emite' = 0,

  'Homologação' = 1,

  'Produção' = 2,
}

export enum ETipoVinculoColaborador {
  Mensalista = 1,
  Horista = 2,
  'Prestador' = 3,
}

export enum ETipoEmail {
  'Não Informado' = 0,

  'Pessoal' = 1,

  'Corporativo' = 2,

  'Email Receita' = 3,
}

export enum ETipoTelefone {
  'Comercial' = 0,

  'Residencial' = 1,

  'Celular' = 2,
}

export enum ETipoPlano {
  'Unidade' = 1,

  'Centro' = 2,

  'Conta Contábil' = 3,

  'Conta Orçamentária' = 4,

  'Conta Demonstração' = 5,

  'Produto' = 6,

  'Conta de Fluxo' = 7,
}

export enum ENecessidadeUsoComposicaoProduto {
  'Inicio' = 0,
  'Programado' = 1,
}

export enum ETipoLiberacaoOrdemFaturamento {
  'Manual' = 0,

  'Automática' = 1,
}

export enum ESituacaoImposto {
  'Automático' = 0,

  'Conferido' = 1,

  'Não Conferido' = 2,
}

export enum ESituacaoConferencia {
  'Automático' = 0,

  'Conferido' = 1,

  'Não Conferido' = 2,
}

export enum ESituacaoOrdem {
  'Em Aberto' = 0,

  'Autorizado' = 1,

  'Em Pagamento' = 2,

  'Em Recebimento' = 3,

  'Quitado' = 4,

  'Renovada' = 5,

  'Estornada' = 6,

  'Cancelada' = 7,

  'Em Cobranca' = 8,
}

export enum ENaturezaOrdem {
  'Recebimento' = 0,

  'Pagamento' = 1,
}

export enum EPeriodicidade {
  'Semanal' = 0,

  'Mensal' = 1,

  'Anual' = 2,

  'Único' = 3,
}

export enum ETipoPagamento {
  'Compra' = 0,

  'Venda' = 1,
}

export enum ETipoUtilizacaoCondicaoPagamento {
  'Compra' = 1,

  'Venda' = 2,
}

export enum ETipoDataCondicaoPagamento {
  'Entrega' = 1,

  'Emissão' = 2,

  'Fixa' = 3,

  'Início do Serviço' = 4,

  'Aprovação' = 5,
}

export enum ENaturezaConsumo {
  'Compra' = 0,

  'Venda' = 1,
}
export enum ETipoIndice {
  'Moeda' = 0,

  'Índice' = 1,
}

export enum EPeriodicidadeIndice {
  'Diário' = 0,

  'Mensal' = 1,
}

export enum EMatrizFilial {
  'Matriz' = 1,

  'Filial' = 2,
}

export enum ECadastroStatus {
  'Incompleto' = 1,

  'Atualizado' = 2,

  'Desatualizado' = 3,
}

export enum EPessoaContribuinte {
  'Não' = 0,

  'Indireto' = 1,

  'Direto' = 2,
}

export enum EPorteEstabelecimento {
  'Micro' = 0,

  'Pequeno' = 1,

  'Médio' = 2,

  'Grande' = 3,

  'Outros' = 4,
}

export enum EPorteReceita {
  'ME' = 0,

  'EPP' = 1,

  'DEMAIS' = 2,
}

export enum ETipoRedeSocial {
  'Site' = 0,

  'Facebook' = 1,

  'Instagram' = 2,

  'Twitter' = 3,

  'LinkedIn' = 3,
}

export enum ETipoPessoa {
  'Pessoa Física' = 0,

  'Pessoa Jurídica' = 1,

  'Obras e Construções (CNO)' = 2,
}

export enum ETipoVinculoCNO {
  'Pessoa Física' = 0,

  'Pessoa Jurídica' = 1,
}

export enum ESerasaStatus {
  'Sem restricao' = 0,

  'Pequeno' = 1,
}

export enum ESituacaoContato {
  'Inativo' = 0,

  'Ativo' = 1,
}
export enum ENaturezaContato {
  'Compra' = 0,

  'Venda' = 1,

  'Compra/Venda' = 3,
}

export enum EPapelRegionalBaseNacional {
  'Nenhum' = 0,

  'Gestor' = 1,

  'Executor' = 2,

  'Operador' = 3,
}

export enum EPessoaStatus {
  'Inativo' = 0,

  'Ativo' = 1,

  'StandBy' = 2,
}

export enum ETipoContaBancaria {
  'Conta Corrente' = 1,

  'Conta Poupança' = 2,
}

export enum EOrigemValorConta {
  'Informada' = 0,

  'Calculada' = 1,
}

export enum EOperacaoPremissaCalculo {
  'Soma' = 0,

  'Subtração' = 1,
}

export enum ETipoValorConta {
  'Valor' = 0,

  'Quantidade' = 1,

  'Quantidade e Valor' = 2,
}

export enum ENivelDePara {
  'Empresa' = 0,

  'Unidade' = 1,

  'Unidade/Centro' = 3,
}

export enum ENivelPrecoConta {
  'Empresa' = 0,

  'Unidade' = 1,

  'Unidade/Centro' = 3,
}
export enum ETipoUsoContaContabil {
  'Geral' = 0,

  'Restrito' = 0,
}

export enum ESituacaoEmpresa {
  'Ativa' = 1,

  'Encerrada' = 2,
}

export enum EClassificacaoCentro {
  'Não Informada' = 0,

  'Administrativo' = 1,

  'Comercial' = 2,

  'Apoio' = 3,

  'Produtivo' = 4,
}
export enum ENaturezaCentro {
  'Nenhuma' = 0,

  'Processo' = 1,

  'Projeto' = 2,

  'Empresa' = 3,
}

export enum EOrigemConta {
  'Ativo' = 1,

  'Passivo' = 2,

  'Despesa' = 3,

  'Receita' = 4,
}

export enum EClassificacaoNaturezaConta {
  'Despesas Pessoal' = 1,
  'Ocupação e Utilidade' = 2,
  'Material' = 3,
  'Transporte e Viagens' = 4,
  'Serviços de Terceiros' = 5,
  'Arrendamento Mercantil' = 6,
  'Impostos e Taxas' = 7,
  'Despesas Diversas' = 8,
  'Transferencias Correntes' = 9,
  'Despesa Capital' = 10,
  'Receita de Serviço' = 100,
}

export enum ENaturezaContaAglutinadora {
  'Ativo' = 1,

  'Passivo' = 2,

  'Patrimônio Líquido' = 3,

  'Resultado' = 4,
}

export enum ETipoContaContabil {
  'Devedora' = 0,

  'Credora' = 0,
}

export enum ERegimeTributario {
  'Nenhum' = 0,

  'Simples Nacional' = 1,

  'Simples Nacional Excesso' = 2,

  'Lucro Presumido' = 3,

  'Lucro Real' = 4,
}

export enum ERegimeTributarioEspecial {
  'Sem Regime Tributario Especial' = 0,

  'Micro Empresa Municipal' = 1,

  'Estimativa' = 2,

  'Sociedade de Profissionais' = 3,

  'Cooperativa' = 4,

  'Micro Empresario Individual - MEI' = 5,

  'Microempresa Ou Pequeno Porte' = 6,
}

export enum EModulo {
  'Produção' = 0,

  'Proposta' = 1,

  'Contrato' = 2,

  'Cobrança' = 3,

  'Projeto' = 4,
}

export enum ETipoStatus {
  'Início' = 0,

  'Andamento' = 1,

  'Término' = 2,
}

export enum ESituacaoOrdemServico {
  'A Programar' = 0,

  'Programada' = 0,

  'Andamento' = 1,

  'Concluida' = 2,

  'Adiantada' = 3,

  'Atrasada' = 4,

  'Liberado' = 2,

  'Autorizado' = 3,

  'Faturado' = 4,
}

export enum EVersaoOrcamento {
  'Oficial' = 1,

  'Gerencial' = 2,

  'Base Zero' = 3,
}

export enum ETipoFichaLancamento {
  'Aprovação' = 1,

  'Remanejamento' = 2,

  'Retificação' = 3,

  'Suplementação' = 4,

  'Transposição' = 5,

  'Realização' = 6,
}

export enum EOrigemMovimento {
  'Orcamento Previsto' = 1,

  'Compras' = 2,

  'Contrato' = 3,

  'Proposta' = 4,

  'Projeto' = 5,
}

export enum ETipoValorOrcamento {
  '1 - Previsto' = 1,

  '2 - Retificado' = 2,

  '3 - Suplementado' = 3,

  '4 - Transposto' = 4,

  '5 - Realizado' = 5,
}

export enum ETipoAgrupador {
  'Acumulador' = 1,

  'Direcionador' = 2,
}

export enum ETipoCenarioOrcamento {
  'Rateio por Agrupador de Unidade' = 1,

  'Rateio por Agrupador de Centro' = 2,
}

export enum ETipoCenarioRateio {
  'Não Aplica Rateio' = 9,

  'Aplica Rateio' = 0,

  'Não Ratear Despesas' = 1,

  'Não Ratear Receitas' = 2,
}

export enum ETipoLotacaoColaborador {
  'Lotação Fisica' = 0,

  'Lotação Orçamentária' = 1,
}

export enum ETipoSalarioCargo {
  'Mensalista' = 1,
  Horista = 5,
}

export enum OrigemValorSalario {
  'Tabela salarial' = 1,
  'Função de confiança' = 2,
  Horista = 3,
}

export enum ENivelTetoOrcamento {
  'Despesa por Unidade/Centro' = 1,
  'Receita por Unidade/Centro' = 2,
  'Resultado por Unidade/Centro' = 3,
}

export enum ETipoConsultaTabelaSalarioPorCargo {
  Horista = 1,
  'Estagiário' = 2,
  'Função de confiança' = 3,
}

export enum ESituacaoPlanejamentoColaborador {
  Desligado = 0,
  Ativo = 1,
  Afastado = 2,
  'Férias' = 3,
  'Vaga disponível' = 4,
  'Vaga cancelada' = 5,
}

export enum EOrigemMovimentacaoColaborador {
  Previsto = 1,
  Revisto = 2,
  Realizado = 3,
}

export enum ETipoMovimentacaoColaborador {
  'Contratação' = 1,
  Desligamento = 2,
  'Alteração de setor' = 3,
  'Alocação orçamentária' = 4,
  'Alteração de cargo' = 5,
}

export enum EOrigemSalario {
  'Tabela Salarial' = 1,
  'Função de Confiança' = 2,
  Horista = 3,
  'Estagiário' = 4,
  'Menor Aprendiz' = 5,
}

export enum ETipoListagemEventoValor {
  Empresa = 1,
  Colaborador = 2,
  Evento = 3,
}

export enum ETipoValorEvento {
  Previsto = 1,
  Revisto = 2,
  Realizado = 3,
}

export enum EStatusProcessamento {
  'Não processa' = 0,
  Pendente = 1,
  'Em processamento' = 2,
  Sucesso = 3,
  Erro = 4,
}
