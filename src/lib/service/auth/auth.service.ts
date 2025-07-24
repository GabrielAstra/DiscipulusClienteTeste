import { environment } from "@/lib/environment/environment";
import { ERRO_REQUISICAO } from "@/types/messages/error-messages";
import { IServiceResponse } from "@/types/response";

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string | undefined;
}
debugger;
export async function login(
  payload: ILoginRequest
): Promise<IServiceResponse<ILoginResponse>> {
  try {

    const resposta = await fetch(
      
      `${environment.DISCIPULUS_API_URL}/Home/Login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(payload),
      }
    );
    const responseBody = await resposta.json();

    return {
      message: responseBody.mensagem,
      success: responseBody.flag,
      data: { token: responseBody.token },
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

export interface ICadastroResponse {
  token?: string;
}

export async function signup(
  payload: ICadastroRequest
): Promise<IServiceResponse<ICadastroResponse>> {
  try {
    const resposta = await fetch(
      `${environment.DISCIPULUS_API_URL}/Home/Registro`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payload, status: 0 }),
      }
    );
    const responseBody = await resposta.json();
    return {
      message: responseBody.message,
      success: responseBody.success,
      data: { token: responseBody.token },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: ERRO_REQUISICAO,
    };
  }
}
