// export interface Habilidade {
//   habilidadeID: string;
//   nomeHabilidade: string;
// }

import { environment } from "@/lib/environment/environment";
import { Habilidade } from "@/types/habilidade";
import { ERRO_REQUISICAO } from "@/types/messages/error-messages";
import { IServiceResponse } from "@/types/response";

interface HabilidadeResponse {
  habilidadeID: string;
  nomeHabilidade: string;
}

export async function fetchTags(
  pagina = 0,
  itensPorPagina = 150
): Promise<IServiceResponse<Habilidade[]>> {
  try {
    const response = await fetch(
      `${environment.DISCIPULUS_API_URL}/Habilidade/Listar`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pagina, itensPorPagina }),
        next: { revalidate: 7200 }, //2h cache
      }
    );
    const body = await response.json();
    console.log(body);
    const dtos = body["$values"] as HabilidadeResponse[];
    const habilidades: Habilidade[] = [];
    dtos.forEach((dto) => {
      habilidades.push({
        id: Number.parseInt(dto.habilidadeID),
        nome: dto.nomeHabilidade,
      });
    });

    return { success: true, data: habilidades };
  } catch (error) {
    console.error(error);
    return { success: false, message: ERRO_REQUISICAO };
  }
}
