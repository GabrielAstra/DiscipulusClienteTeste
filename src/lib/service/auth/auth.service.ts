import { environment } from "@/lib/environment/environment";

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  flag: boolean;
  token: string | undefined;
  mensagem: string;
}

export async function login(payload: ILoginRequest): Promise<ILoginResponse> {
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
    console.log(responseBody);
    return await resposta.json();
  } catch (error) {
    console.error(error);
    return {
      flag: false,
      mensagem: "Erro ao executar requisicao",
      token: undefined,
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
  token: string;
  mensagem: string;
  email: string;
}

export async function signup(
  payload: ICadastroRequest
): Promise<ICadastroResponse> {
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
    console.log(responseBody);

    return await resposta.json();
  } catch (error) {
    console.error(error);
    return {
      email: "",
      mensagem: "Erro ao executar requisicao",
      token: "",
    };
  }
}
