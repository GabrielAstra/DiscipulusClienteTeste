import { NextResponse } from "next/server";
import { cookies } from "next/headers";


const API_URL = process.env.NEXT_PUBLIC_DISCIPULUS_API_URL

export async function GET(request: Request) {
    const token = (await cookies()).get("token")?.value;

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json(
            { success: false, message: "ID não fornecido" },
            { status: 400 }
        );
    }

    const res = await fetch(`${API_URL}/Professor/BuscarProfessor?id=${id}`, {
        headers,
    });



    const raw = await res.json();
    const habilidades = (raw.habilidades?.$values ?? []).map(
        (h: { nomeHabilidade?: string; habilidadeID?: string }) =>
            h.nomeHabilidade ?? String(h.habilidadeID ?? "")
    );
    const data = {
        ...raw,
        habilidades,
        detalhesHabilidades: raw.habilidades,
    };
    return NextResponse.json(data);
}
