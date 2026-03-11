import { ERRO_REQUISICAO } from "@/types/messages/error-messages";
import { IServiceResponse } from "@/types/response";
import { fetchWithAuth } from "@/lib/helper/fetchWithAuth";
import {
  ObterProfessorResponse,
  mapearObterProfessorParaPerfil,
} from "@/utils/mapObterProfessor";
import { PerfilProfessor } from "@/types/teacher";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  erros: string[] | null;
  timestamp: string;
}

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

    const apiResponse: ApiResponse<ObterProfessorResponse> = await response.json();
    
    if (!apiResponse.success) {
      return { 
        success: false, 
        message: apiResponse.message || ERRO_REQUISICAO 
      };
    }

    const perfil = mapearObterProfessorParaPerfil(apiResponse.data);

    return { 
      success: true, 
      data: perfil,
      message: apiResponse.message 
    };
  } catch (error) {
    console.error("Erro ao obter professor:", error);
    return { success: false, message: ERRO_REQUISICAO };
  }
}
