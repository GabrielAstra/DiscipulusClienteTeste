import { environment } from "@/lib/environment/environment";
import { ERRO_REQUISICAO } from "@/types/messages/error-messages";
import { IServiceResponse } from "@/types/response";

export interface FormacaoResponse {
  id: string; 
  titulo: string;
  instituicao: string;
  dtInicio: string;
  dtConclusao: string;
}

export interface FormacaoDTO {
  id: string;
  titulo: string;
  instituicao: string;
  dtInicio: string;
  dtConclusao: string;
}

export async function listarFormacoes(token: string): Promise<IServiceResponse<FormacaoDTO[]>> {
  try {
    const response = await fetch(
      `${environment.DISCIPULUS_API_URL}/Formacao/Listar`,
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

    const formacoes: FormacaoResponse[] = body.formacoesResponse?.formacao?.["$values"] || [];
    

    const formacoesDTO: FormacaoDTO[] = formacoes.map((formacao: FormacaoResponse) => ({
      id: formacao.id, 
      titulo: formacao.titulo,
      instituicao: formacao.instituicao,
      dtInicio: formacao.dtInicio,
      dtConclusao: formacao.dtConclusao,
    }));


    return { success: true, data: formacoesDTO };
  } catch (error) {
    console.error("Erro ao listar formações:", error);
    return { success: false, message: ERRO_REQUISICAO };
  }
}