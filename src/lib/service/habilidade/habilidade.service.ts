import { environment } from "@/lib/environment/environment";
import { Habilidade } from "@/types/habilidade";
import { ERRO_REQUISICAO } from "@/types/messages/error-messages";
import { IServiceResponse } from "@/types/response";

interface HabilidadeResponse {
  habilidadeID: string;
  nomeHabilidade: string;
}

export async function listarHabilidades(
  pagina = 0,
  itensPorPagina = 150
): Promise<IServiceResponse<Habilidade[]>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DISCIPULUS_API_URL}/Habilidade/Listar`,
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
    const dtos = body["$values"] as HabilidadeResponse[];
    const habilidades: Habilidade[] = [];
    dtos.forEach((dto) => {
      habilidades.push({
        id: dto.habilidadeID,
        nome: dto.nomeHabilidade,
      });
    });

    return { success: true, data: habilidades };
  } catch (error) {
    console.error(error);
    return { success: false, message: ERRO_REQUISICAO };
  }
}
