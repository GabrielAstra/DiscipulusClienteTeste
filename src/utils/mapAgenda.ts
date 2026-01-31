import { diasSemana } from "@/constants/teacher";
import { HorarioDisponivel } from "@/types/teacher";


export function mapearAgendaParaPerfil(api: any): {
    dia: string;
    horarios: HorarioDisponivel[];
}[] {
    if (!api?.objeto?.$values) return [];

    return api.objeto.$values.map((diaItem: any) => {
        const diaNome = diasSemana[diaItem.diaSemana];

        return {
            dia: diaNome,
            horarios: diaItem.horarios?.$values?.map((h: any) => ({
                id: h.id,
                HoraInicial: h.horaInicial.substring(0, 5),
                HoraFinal: h.horaFinal.substring(0, 5),
                agendaDisponivelEnum: 1
            })) || [],
        };
    });
}
