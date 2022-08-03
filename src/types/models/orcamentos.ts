import { INaturezaConta } from '+/types/models/empresarial';

export interface INaturezaOrcamento {
  ativo: boolean;
  codigo: string;
  id: number;
  inicioValidade: string;
  naturezasContas: INaturezaConta[];
  nome: string;
  terminoValidade: string;
  utilizaTetoOrcamento: boolean;
}

export interface ITetoOrcamento {
  centroId: number;
  classificacaoNaturezaConta: number;
  descricao: string;
  empresaAnoFiscalId: number;
  id: number;
  naturezaContaId: number;
  naturezaOrcamentoId: number;
  nivelTetoOrcamento: number;
  origemConta: number;
  unidadeCentroId: number;
  unidadeId: number;
  valorPrevisto: number;
  valorReal: number;
  valorRevisto: number;
}
