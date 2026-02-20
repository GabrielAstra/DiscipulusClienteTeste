export interface FormacaoDTO {
    id: string;
    titulo: string;
    instituicao: string;
    dtInicio: string;
    dtConclusao: string;
}

export interface ExperienciaDTO {
    id: string;
    titulo: string;
    instituicao: string;
    inicio: string;
    fim: string;
    descricao: string;
}

export interface HorarioDisponivel {
    id?: string;
    HoraInicial: string;
    HoraFinal: string;
}

export interface DisponibilidadeDia {
    dia: string;
    horarios: HorarioDisponivel[];
}

export interface PerfilProfessor {
    id: string;
    nome: string;
    email: string;
    avatar: string;
    biografia: string;
    urlFoto?: string;
    materias: string[];
    valorHora: number;
    experiencia: ExperienciaDTO[];
    idiomas: string[];
    disponibilidade?: string[];
    disponibilidadeHorarios: DisponibilidadeDia[];
    diasBloqueados?: string[];
    formacao: FormacaoDTO[];
    certificacoes: string[];
    telefone: string;
    localizacao: string;
    tempoExperiencia: number;
}

export interface Transacao {
    id: string;
    tipo: "ganho" | "saque";
    valor: number;
    descricao: string;
    data: string;
    status: "concluido" | "pendente" | "falhou";
}

export interface DadosCarteira {
    saldo: number;
    ganhosTotal: number;
    pagamentosPendentes: number;
    ganhosMensais: number;
    transacoes: Transacao[];
}

export interface Habilidade {
    id: number;
    nome: string;
}


export interface AgendaHorarioPayload {
    horaInicial: string;
    horaFinal: string;
    agendaDisponivelEnum: number;
}

export interface AgendaDiaPayload {
    diaSemana: number;
    horarios: AgendaHorarioPayload[];
}

