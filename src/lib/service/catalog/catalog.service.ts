const BASE_URL = "/api/catalog";

interface ListarProfessoresParams {
    filtros?: string;
    pagina?: number;
    paginacao?: number;
    busca?: boolean;
}

export async function listarProfessores({
    filtros,
    pagina = 1,
    paginacao = 10,
    busca = false,
}: ListarProfessoresParams = {}) {
    const params = new URLSearchParams();

    if (filtros) params.append("filtros", filtros);
    params.append("pagina", String(pagina));
    params.append("paginacao", String(paginacao));
    params.append("busca", String(busca));

    const res = await fetch(`${BASE_URL}?${params.toString()}`, {
        method: "POST",
    });

    if (!res.ok) {
        throw new Error("Erro ao buscar professores");
    }

    return res.json();
}
