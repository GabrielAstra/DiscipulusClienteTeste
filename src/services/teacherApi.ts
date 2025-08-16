import { FormacaoDTO, ExperienciaDTO, PerfilProfessor, Habilidade } from '@/types/teacher';
import { IResponse } from '@/types/response';
import { ERRO_REQUISICAO } from '@/types/messages/error-messages';

export async function buscarInformacoesPessoais(): Promise<Partial<PerfilProfessor> | null> {
  try {
    const res = await fetch(`/api/informacoesPessoais`, {
      method: "GET",
    });

    const body = (await res.json()) as IResponse<any>;

    if (!body.success) {
      throw new Error(body.message ?? ERRO_REQUISICAO);
    }

    const data = body.data;
    const idiomasArray = data.idiomas
      ? data.idiomas.split(",").map((i: string) => i.trim()).filter(Boolean)
      : [];

    return {
      nome: data.nome,
      email: data.email,
      avatar: data.urlFoto,
      biografia: data.biografia,
      valorHora: data.horaAula,
      telefone: data.celular || "",
      localizacao: data.localizacao || "",
      idiomas: idiomasArray,
    };
  } catch (err) {
    console.error("Erro ao buscar informações pessoais:", err);
    throw err;
  }
}

export async function buscarFormacoes(): Promise<FormacaoDTO[]> {
  try {
    const res = await fetch(`/api/formacao`, {
      method: "GET",
    });
    const body = (await res.json()) as IResponse<FormacaoDTO[]>;

    if (!body.success) {
      throw new Error(body.message ?? ERRO_REQUISICAO);
    }

    return body.data ?? [];
  } catch (err) {
    console.error("Erro ao buscar formações:", err);
    throw err;
  }
}

export async function buscarExperiencias(): Promise<ExperienciaDTO[]> {
  try {
    const res = await fetch(`/api/experiencia`, {
      method: "GET",
    });
    const body = (await res.json()) as IResponse<ExperienciaDTO[]>;

    if (!body.success) {
      throw new Error(body.message ?? ERRO_REQUISICAO);
    }

    return body.data ?? [];
  } catch (err) {
    console.error("Erro ao buscar experiencias:", err);
    throw err;
  }
}

export async function buscarHabilidades(): Promise<Habilidade[]> {
  const res = await fetch("/api/habilidade", { method: "GET" });
  const body = (await res.json()) as IResponse<Habilidade[]>;
  if (!body.success) {
    throw new Error(body.message ?? ERRO_REQUISICAO);
  }
  return body.data!;
}

export async function removerFormacao(id: string): Promise<void> {
  const res = await fetch(`/api/formacao/${id}`, {
    method: "DELETE",
  });

  const result = await res.json();

  if (!result.success) {
    throw new Error(result.message || "Erro ao remover formação.");
  }
}

export async function removerExperiencia(id: string): Promise<void> {
  const res = await fetch(`/api/experiencia/${id}`, {
    method: "DELETE",
  });

  const result = await res.json();

  if (!result.success) {
    throw new Error(result.message || "Erro ao remover experiência.");
  }
}

export async function salvarPerfilCompleto(payload: any): Promise<void> {
  const response = await fetch('/api/salvarPerfilCompleto', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Erro ao salvar perfil.");
  }
}