export interface CadastroResponse {
  token: string;
  mensagem: string;
  email: string;
}

export interface UsuarioCadastro {
  nome: string;
  email: string;
  senha: string;
  tipoUsuario: number; // 1 = professor, 2 = estudante
}

export async function cadastrarUsuario(
  dados: UsuarioCadastro
): Promise<CadastroResponse> {
  const resposta = await fetch("https://localhost:7228/Home/Registro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...dados, status: 0 }),
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.message || "Erro ao cadastrar");
  }

  return await resposta.json();
}

// src/service/api.ts

export interface Habilidade {
  habilidadeID: string;
  nomeHabilidade: string;
}

export async function listarHabilidades(
  pagina = 0,
  itensPorPagina = 10
): Promise<Habilidade[]> {
  try {
    const response = await fetch("https://localhost:7228/Habilidade/Listar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pagina, itensPorPagina }),
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar habilidades");
    }

    const data = await response.json();
    return data["$values"] as Habilidade[];
  } catch (error) {
    console.error("Erro ao listar habilidades:", error);
    return [];
  }
}
