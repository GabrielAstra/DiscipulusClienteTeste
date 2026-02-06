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




export async function listarExperiencias(token: string): Promise<IServiceResponse<ExperienciaDTO[]>> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_DISCIPULUS_API_URL}/Experiencia/Listar`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            }
        );

        if (!response.ok) {
            console.error(`Erro na API: ${response.status} - ${response.statusText}`);
            return { success: false, message: ERRO_REQUISICAO };
        }

        const body = await response.json();

        const experiencias: ExperienciaResponse[] = body["$values"] || [];


        const experienciasDTO: ExperienciaDTO[] = experiencias.map((experiencia: ExperienciaResponse) => ({
            id: experiencia.id,
            titulo: experiencia.titulo,
            instituicao: experiencia.instituicao,
            inicio: experiencia.inicio,
            fim: experiencia.fim,
            descricao: experiencia.descricao
        }));



        return { success: true, data: experienciasDTO };
    } catch (error) {
        console.error("Erro ao listar experiências:", error);
        return { success: false, message: ERRO_REQUISICAO };
    }
}


export async function excluirExperiencia(id: string, token: string): Promise<IServiceResponse<null>> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DISCIPULUS_API_URL}/Experiencia/Excluir?experienciaId=${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error(`Erro ao excluir experiência: ${response.status} - ${response.statusText}`);
            return { success: false, message: ERRO_REQUISICAO };
        }

        return { success: true, data: null };
    } catch (error) {
        console.error("Erro ao excluir experiência:", error);
        return { success: false, message: ERRO_REQUISICAO };
    }
}