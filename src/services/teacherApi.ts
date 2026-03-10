import { FormacaoDTO, ExperienciaDTO, PerfilProfessor, Habilidade } from '@/types/teacher';
import { IResponse } from '@/types/response';
import { ERRO_REQUISICAO } from '@/types/messages/error-messages';

export async function obterPerfilCompleto(): Promise<PerfilProfessor | null> {
  try {
    const res = await fetch(`/api/perfilProfessor`, {
      method: "GET",
    });

    const body = (await res.json()) as IResponse<PerfilProfessor>;

    if (!body.success) {
      throw new Error(body.message ?? ERRO_REQUISICAO);
    }

    return body.data ?? null;
  } catch (err) {
    console.error("Erro ao obter perfil completo:", err);
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