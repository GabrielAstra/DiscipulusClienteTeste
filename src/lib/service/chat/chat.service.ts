import { Conversation } from "@/types/chat";

export async function listarConversas(): Promise<Conversation[]> {
    const res = await fetch("/api/chat/conversas", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Erro ao listar conversas");
    }

    return res.json();
}



