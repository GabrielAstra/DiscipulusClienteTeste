import { Habilidade } from "@/service/api";


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
