import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL_BACKEND ?? "http://localhost:5156/Agenda";

export async function GET(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json({ success: false, message: "Sem token!" }, { status: 401 });
    }

    try {
        const res = await fetch(`${API_URL}/Listar`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const raw = await res.text();   // <-- PRIMEIRO lê como texto

        // Caso retorno não seja JSON
        if (!raw) {
            return NextResponse.json(
                { success: false, message: "Resposta vazia da API!" },
                { status: 500 }
            );
        }

        let data;
        try {
            data = JSON.parse(raw);     // <-- tenta converter para JSON
        } catch {
            return NextResponse.json(
                { success: false, message: "Resposta não é um JSON válido!", raw },
                { status: 500 }
            );
        }

        return NextResponse.json(data);

    } catch (error) {
        console.error("ERRO AO LISTAR AGENDA:", error);
        return NextResponse.json(
            { success: false, message: "Erro inesperado ao listar agenda." },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const body = await request.json();
    console.log("corpo:", JSON.stringify(body));
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json({ success: false, message: "Sem token!" }, { status: 401 });
    }

    const res = await fetch(`${API_URL}/Salvar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });


    const data = await res.json();
    return NextResponse.json(data);
}

export async function DELETE(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json({ success: false, message: "Sem token!" }, { status: 401 });
    }

    const { ids } = await request.json();

    const res = await fetch(`${API_URL}/Remover`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ids),
    });

    const data = await res.json();
    return NextResponse.json(data);
}
