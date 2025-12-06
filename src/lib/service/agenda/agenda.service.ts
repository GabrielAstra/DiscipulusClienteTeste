const BASE_URL = "/api/agenda";

export async function listarAgenda(professorId: string) {
    const res = await fetch(`${BASE_URL}?professorId=${professorId}`, {
        method: "GET",
    });

    return res.json();
}

export async function salvarAgenda(dados: any) {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    });

    return res.json();
}

export async function removerAgenda(id: string) {
    const res = await fetch(`${BASE_URL}?id=${id}`, {
        method: "DELETE",
    });

    return res.json();
}


