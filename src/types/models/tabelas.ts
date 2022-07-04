export interface IAtividadeEconomica {
    id: number;
    codigo: string;
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