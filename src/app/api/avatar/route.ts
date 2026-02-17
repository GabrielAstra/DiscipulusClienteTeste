import { NextResponse } from "next/server";
import { cookies } from "next/headers";


const API_URL = process.env.NEXT_PUBLIC_DISCIPULUS_API_URL;

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Sem token" }, { status: 401 });
    }

    const res = await fetch(`${API_URL}/Arquivo/avatar`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        return NextResponse.json({ message: "Avatar não encontrado" }, { status: 404 });
    }

    const blob = await res.arrayBuffer();

    return new NextResponse(blob, {
        headers: {
            "Content-Type": res.headers.get("content-type") || "image/png",
        },
    });
}


export async function POST(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Sem token" }, { status: 401 });
    }

    const formData = await request.formData();

    const res = await fetch(`${API_URL}/Arquivo/Armazenar`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.log("Erro backend:", res.status, errorText);

        return NextResponse.json(
            { message: "Erro ao enviar avatar", detalhe: errorText },
            { status: res.status }
        );
    }

    const data = await res.json();
    return NextResponse.json(data);
}
