import { Message } from "@/types/chat";
import { useUsuario } from "@/context/UsuarioContext";

interface MensagemDTO {
    mensagemId: string;
    conversaId: string;
    usuarioId: string;
    conteudo: string;
    dataCriacao: string;
}

export async function listarMensagens(
    conversaId: string,
    usuarioId: string
): Promise<Message[]> {
    const res = await fetch(
        `/api/chat/messages?conversaId=${encodeURIComponent(conversaId)}`,
        { method: "GET", cache: "no-store" }
    );

    if (!res.ok) throw new Error("Erro ao carregar mensagens");

    const raw = await res.json();
    const data: MensagemDTO[] = raw.$values ?? raw;

    return data.map((m) => ({
        id: m.mensagemId,
        text: m.conteudo,
        sender: m.usuarioId === usuarioId ? "user" : "other",
        timestamp: new Date(m.dataCriacao),
    }));
}
