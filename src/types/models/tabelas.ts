export interface IAtividadeEconomica {
    id: number;
    codigo:string
    nome: string;
    nivelHierarquia: number;
    divisao: string;
    grupo: string;
    classe: string;
    subClasse: string;
    grauRisco: number;
    inicioValidade: string;
    terminoValidade: string;
    ativo: boolean
}

export interface INaturezaJuridica {
    codigo: string;
    nome: string;
    inicioValidade: string;
    terminoValidade: string;
    ativo: boolean;
    id: number;
  }