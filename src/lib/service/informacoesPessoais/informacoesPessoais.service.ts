import { environment } from "@/lib/environment/environment";
import { ERRO_REQUISICAO } from "@/types/messages/error-messages";
import { IServiceResponse } from "@/types/response";
import { fetchWithAuth } from "@/lib/helper/fetchWithAuth";

export interface InformacoesPessoaisResponse {
    usuarioID: string;
    nome: string;
    biografia: string;
    sobreMim: string;
    email: string;
    celular: string | null;
    status: number;
    horaAula: number;
    username: string;
    urlFoto: string;
    idiomas: string;
    localizacao: string;
    tempoExperiencia: number;
}

export interface InformacoesPessoaisDTO {
    nome: string;
    biografia: string;
    sobreMim: string;
    email: string;
    celular: string | null;
    horaAula: number;
    username: string;
    urlFoto: string;
    idiomas: string;
    localizacao: string;
    tempoExperiencia: number;
}


export async function listarInformacoesPessoais(): Promise<IServiceResponse<InformacoesPessoaisDTO>> {
    try {
        const response = await fetchWithAuth(
            `${process.env.NEXT_PUBLIC_DISCIPULUS_API_URL}/Perfil/MeuPerfilMin`,
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

        const body: InformacoesPessoaisResponse = await response.json();

        const informacoesPessoaisDTO: InformacoesPessoaisDTO = {
            nome: body.nome,
            biografia: body.biografia,
            sobreMim: body.sobreMim,
            email: body.email,
            celular: body.celular,
            horaAula: body.horaAula,
            username: body.username,
            urlFoto: body.urlFoto,
            idiomas: body.idiomas,
            localizacao: body.localizacao,
            tempoExperiencia: body.tempoExperiencia
        };

        return { success: true, data: informacoesPessoaisDTO };

    } catch (error) {
        console.error("Erro ao listar informações pessoais:", error);
        return { success: false, message: ERRO_REQUISICAO };
    }
}