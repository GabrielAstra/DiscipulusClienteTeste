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

export interface PerfilProfessor {
    id: string;
    nome: string;
    email: string;
    avatar: string;
    biografia: string;
    materias: string[];
    valorHora: number;
    experiencia: ExperienciaDTO[];
    idiomas: string[];
    disponibilidade: string[];
    diasBloqueados: string[];
    formacao: FormacaoDTO[];
    certificacoes: string[];
    telefone: string;
    localizacao: string;
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