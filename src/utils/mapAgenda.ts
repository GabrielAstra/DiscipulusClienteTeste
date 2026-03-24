import { diasSemana } from "@/constants/teacher";
import { HorarioDisponivel } from "@/types/teacher";


export function mapearAgendaParaPerfil(api: { objeto?: { $values?: unknown[] } }): {
    dia: string;
    horarios: HorarioDisponivel[];
}[] {
    if (!api?.objeto?.$values) return [];

    return api.objeto.$values.map((diaItem: unknown) => {
        const item = diaItem as { diaSemana: number; horarios?: { $values?: { id: string; horaInicial: string; horaFinal: string }[] } };
        const diaNome = diasSemana[item.diaSemana];

        return {
            dia: diaNome,
            horarios: item.horarios?.$values?.map((h) => ({
                id: h.id,
                HoraInicial: h.horaInicial.substring(0, 5),
                HoraFinal: h.horaFinal.substring(0, 5),
                agendaDisponivelEnum: 1
            })) || [],
        };
    });
}
