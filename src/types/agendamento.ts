export interface DadosAgendamento {
    professorId: string;
    professorNome: string;
    professorAvatar: string;
    professorValorHora: number;
    professorAvaliacao?: {
        nota: number;
        total: number;
    };
    dataSelecionada: string;
    diaSemana: string;
    horarioSelecionado: string;
    horarioFinal?: string;
    duracao: number;
    observacoes: string;
    precoTotal: number;
    // Dados retornados pelo endpoint de checkout
    checkoutSessaoId?: string;
    tokenPublico?: string;
}

