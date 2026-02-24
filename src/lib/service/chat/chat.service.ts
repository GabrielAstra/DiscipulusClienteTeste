import { fetchWithAuth } from "@/lib/helper/fetchWithAuth";

const API_URL = process.env.NEXT_PUBLIC_DISCIPULUS_API_URL;

export async function listarConversasService() {
    const response = await fetchWithAuth(
        `${API_URL}/Chat/ListarConversas`,
        {
            method: "GET",
        }
    );

    if (!response.ok) {
        return { success: false, message: "Erro ao listar conversas" };
    }

    const data = await response.json();
    return { success: true, data };
}