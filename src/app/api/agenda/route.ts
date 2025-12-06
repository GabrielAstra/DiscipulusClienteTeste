import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL_BACKEND ?? "http://localhost:5156/Agenda";

export async function GET(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json({ success: false, message: "Sem token!" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const professorId = searchParams.get("professorId");

    const res = await fetch(`${API_URL}/Listar?professorId=${professorId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    const data = await res.json();
    return NextResponse.json(data);
}
export async function POST(request: Request) {
    const body = await request.json();

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

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const res = await fetch(`${API_URL}/Remover?id=${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    const data = await res.json();
    return NextResponse.json(data);
}

