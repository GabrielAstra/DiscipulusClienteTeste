import { ERRO_REQUISICAO } from "@/types/messages/error-messages";
import { IServiceResponse } from "@/types/response";
import { AuthResponse, AuthTokens } from "@/types/auth";

export interface ILoginRequest {
  email: string;
  password: string;
  lembrarLogin: boolean;
}

export async function login(
  payload: ILoginRequest
): Promise<IServiceResponse<AuthTokens>> {
  try {
    const resposta = await fetch(
      `${process.env.NEXT_PUBLIC_DISCIPULUS_API_URL}/Home/Login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(payload),
      }
    );
    
    const responseBody: AuthResponse = await resposta.json();

    return {
      message: responseBody.message,
      success: responseBody.success,
      data: responseBody.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: ERRO_REQUISICAO,
      data: undefined,
    };
  }
}

export interface ICadastroRequest {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  tipoUsuario: number; // 1 = professor, 2 = estudante
}

export async function signup(
  payload: ICadastroRequest
): Promise<IServiceResponse<AuthTokens>> {
  try {
    const resposta = await fetch(
      `${process.env.NEXT_PUBLIC_DISCIPULUS_API_URL}/Home/Registro`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payload, status: 0 }),
      }
    );
    
    const responseBody: AuthResponse = await resposta.json();
    
    return {
      message: responseBody.message,
      success: responseBody.success,
      data: responseBody.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: ERRO_REQUISICAO,
    };
  }
}
