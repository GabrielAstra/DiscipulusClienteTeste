import { Habilidade } from "@/types/habilidade";
import { ERRO_REQUISICAO } from "@/types/messages/error-messages";
import { IServiceResponse } from "@/types/response";

import { fetchWithAuth } from "@/lib/helper/fetchWithAuth";

interface HabilidadeResponse {
  habilidadeID: string;
  nomeHabilidade: string;
}

export async function listarHabilidades(
  pagina = 0,
  itensPorPagina = 150
): Promise<IServiceResponse<Habilidade[]>> {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_DISCIPULUS_API_URL}/Habilidade/Listar`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pagina, itensPorPagina }),
        next: { revalidate: 7200 },
      }
    );

    if (!response.ok) {
      return { success: false, message: ERRO_REQUISICAO };
    }

    const body = await response.json();

    if (!body.success) {
      return { success: false, message: body.message || ERRO_REQUISICAO };
    }

    const dtos = body.data["$values"] as HabilidadeResponse[];

    const habilidades: Habilidade[] = dtos.map(dto => ({
      id: dto.habilidadeID,
      nome: dto.nomeHabilidade,
    }));

    return { success: true, data: habilidades };

  } catch (error) {
    console.error(error);
    return { success: false, message: ERRO_REQUISICAO };
  }
}