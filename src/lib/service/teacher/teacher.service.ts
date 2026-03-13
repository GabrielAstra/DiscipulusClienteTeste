
export async function listarProfessor(id: string) {
    const res = await fetch(`/api/teacher?id=${id}`);
    const data = await res.json();
    
    if (!res.ok || (data.success !== undefined && !data.success)) {
        throw new Error(data.message || "Professor não encontrado");
    }
    
    return data;
}



