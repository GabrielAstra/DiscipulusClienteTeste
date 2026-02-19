
export async function listarProfessor(id: string) {
    const res = await fetch(`/api/teacher?id=${id}`);
    if (!res.ok) throw new Error("Erro ao buscar professor");
    return res.json();
}



