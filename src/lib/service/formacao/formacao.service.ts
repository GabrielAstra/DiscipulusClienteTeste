import { ERRO_REQUISICAO } from "@/types/messages/error-messages";
import { IServiceResponse } from "@/types/response";
import { fetchWithAuth } from "@/lib/helper/fetchWithAuth";

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


export async function listarFormacoes() {

  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_DISCIPULUS_API_URL}/Formacao/Listar`,
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

  const formacoes =
    body.formacoesResponse?.formacao?.["$values"] || [];

  return { success: true, data: formacoes };
}


export async function excluirFormacao(id: string): Promise<IServiceResponse<null>> {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_DISCIPULUS_API_URL}/Formacao/Excluir?formacaoId=${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      console.error(`Erro ao excluir formacao: ${response.status}`);
      return { success: false, message: ERRO_REQUISICAO };
    }

    return { success: true, data: null };

  } catch (error) {
    console.error("Erro ao excluir formacao:", error);
    return { success: false, message: ERRO_REQUISICAO };
  }
}