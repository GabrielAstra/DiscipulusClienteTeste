import { Conversation, Message } from '../types/chat';
export interface AulaAgendada {
    id: string;
    alunoNome: string;
    alunoAvatar: string;
    materia: string;
    data: string;
    horaInicio: string;
    horaFim: string;
    status: "confirmada" | "pendente" | "concluida" | "cancelada";
}
export const aulasMock: AulaAgendada[] = [
    {
        id: "1",
        alunoNome: "João Silva",
        alunoAvatar: "https://i.pravatar.cc/150?img=1",
        materia: "Matemática",
        data: "2026-02-25",
        horaInicio: "14:00",
        horaFim: "15:00",
        status: "confirmada",
    },
    {
        id: "2",
        alunoNome: "Maria Santos",
        alunoAvatar: "https://i.pravatar.cc/150?img=2",
        materia: "Física",
        data: "2026-02-25",
        horaInicio: "16:00",
        horaFim: "17:00",
        status: "pendente",
    },
    {
        id: "3",
        alunoNome: "Indiano Raiz",
        alunoAvatar: "https://i.pravatar.cc/150?img=33",
        materia: "Física",
        data: "2026-02-27",
        horaInicio: "16:00",
        horaFim: "17:00",
        status: "pendente",
    },
    {
        id: "4",
        alunoNome: "Indian Guy",
        alunoAvatar: "https://i.pravatar.cc/150?img=3",
        materia: "Física",
        data: "2026-02-28",
        horaInicio: "16:00",
        horaFim: "17:00",
        status: "pendente",
    }
];