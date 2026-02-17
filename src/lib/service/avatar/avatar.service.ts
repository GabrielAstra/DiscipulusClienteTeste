


export async function uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/avatar", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        throw new Error("Erro ao enviar imagem");
    }

    return await res.json();
}

