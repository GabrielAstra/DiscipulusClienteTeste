import { environment } from "@/lib/environment/environment";
import { ERRO_REQUISICAO } from "@/types/messages/error-messages";
import { IServiceResponse } from "@/types/response";



export interface ExperienciaResponse {
    id: string;
    titulo: string;
    instituicao: string;
    inicio: string;
    fim: string;
    descricao: string;
}

export interface ExperienciaDTO {
    id: string;
    titulo: string;
    instituicao: string;
    inicio: string;
    fim: string;
    descricao: string;
}



import { fetchWithAuth } from "@/lib/helper/fetchWithAuth";

export async function listarExperiencias(): Promise<IServiceResponse<ExperienciaDTO[]>> {
    try {
        const response = await fetchWithAuth(
            `${process.env.NEXT_PUBLIC_DISCIPULUS_API_URL}/Experiencia/Listar`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            return { success: false, message: ERRO_REQUISICAO };
        }

        const body = await response.json();
        const experiencias: ExperienciaResponse[] = body["$values"] || [];

        const experienciasDTO: ExperienciaDTO[] = experiencias.map((experiencia) => ({
            id: experiencia.id,
            titulo: experiencia.titulo,
            instituicao: experiencia.instituicao,
            inicio: experiencia.inicio,
            fim: experiencia.fim,
            descricao: experiencia.descricao
        }));

        return { success: true, data: experienciasDTO };
    } catch (error) {
        console.error(error);
        return { success: false, message: ERRO_REQUISICAO };
    }
}
export async function excluirExperiencia(id: string): Promise<IServiceResponse<null>> {
    try {
        const response = await fetchWithAuth(
            `${process.env.NEXT_PUBLIC_DISCIPULUS_API_URL}/Experiencia/Excluir?experienciaId=${id}`,
            {
                method: "DELETE",
            }
        );

        if (!response.ok) {
            return { success: false, message: ERRO_REQUISICAO };
        }

        return { success: true, data: null };
    } catch (error) {
        console.error(error);
        return { success: false, message: ERRO_REQUISICAO };
    }
}