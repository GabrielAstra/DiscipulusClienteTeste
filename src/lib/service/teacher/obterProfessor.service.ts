import { ERRO_REQUISICAO } from "@/types/messages/error-messages";
import { IServiceResponse } from "@/types/response";
import { fetchWithAuth } from "@/lib/helper/fetchWithAuth";
import {
  ObterProfessorResponse,
  mapearObterProfessorParaPerfil,
} from "@/utils/mapObterProfessor";
import { PerfilProfessor } from "@/types/teacher";

export async function obterProfessor(): Promise<
  IServiceResponse<PerfilProfessor>
> {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_DISCIPULUS_API_URL}/Professor/ObterProfessor`,
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

    const body: ObterProfessorResponse = await response.json();
    const perfil = mapearObterProfessorParaPerfil(body);

    return { success: true, data: perfil };
  } catch (error) {
    console.error("Erro ao obter professor:", error);
    return { success: false, message: ERRO_REQUISICAO };
  }
}
