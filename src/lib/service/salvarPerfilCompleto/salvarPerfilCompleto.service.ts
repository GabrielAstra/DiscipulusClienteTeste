import { environment } from "@/lib/environment/environment";
import { ERRO_REQUISICAO } from "@/types/messages/error-messages";
import { IServiceResponse } from "@/types/response";

export interface EditarPerfilPayload {
    perfil: {
        nome: string;
        sobrenome: string;
        biografia: string;
        sobreMim: string;
        status: number;
        precoHoraAula: number;
        fotoPerfil: string;
        idiomas: string;
        localizacao: string;
    };
    formacoes: {
        titulo: string;
        instituicao: string;
        dtInicio: string;
        dtConclusao: string;
    }[];
    experiencias: {
        titulo: string;
        instituicao: string;
        inicio: string;
        fim: string;
        descricao: string;
    }[];
    habilidades: string[];
}

export async function editarPerfilCompleto(
    token: string,
    payload: EditarPerfilPayload
): Promise<IServiceResponse<null>> {
    try {
        const response = await fetch(
            `${environment.DISCIPULUS_API_URL}/Perfil/EditarPerfilCompleto`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            }
        );

        if (!response.ok) {
            console.error(`Erro na API: ${response.status} - ${response.statusText}`);
            return { success: false, message: ERRO_REQUISICAO };
        }

        return { success: true, data: null };
    } catch (error) {
        console.error("Erro ao editar perfil completo:", error);
        return { success: false, message: ERRO_REQUISICAO };
    }
}
