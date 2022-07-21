import { INaturezaConta } from '+/types/models/empresarial';

export interface INaturezaOrcamento {
  ativo: boolean;
  codigo: string;
  id: number;
  inicioValidade: string;
  naturezasContas: INaturezaConta[];
  nome: string;
  terminoValidade: string;
}
