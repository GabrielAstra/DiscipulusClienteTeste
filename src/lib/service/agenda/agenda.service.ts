const BASE_URL = "/api/agenda";

export async function listarAgenda() {
    const res = await fetch(BASE_URL, {
        method: "GET",
    });

    return res.json();
}

export async function salvarAgenda(dados: unknown) {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    });

    return res.json();
}

export async function removerAgenda(ids: string[]) {
    const res = await fetch("/api/agenda", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }),
    });

    return res.json();
}






