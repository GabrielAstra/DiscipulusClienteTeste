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
    duracao: number;
    observacoes: string;
    precoTotal: number;
}
