import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_DISCIPULUS_API_URL;

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json({ success: false, message: "Sem token!" }, { status: 401 });
    }

    const body = await request.json();

    const url = `${API_URL}/api/Agendamento/iniciar-checkout`;
  
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    const raw = await res.text();

    let data;
    try {
        data = JSON.parse(raw);
    } catch {
        return NextResponse.json({ success: false, message: "Resposta inválida do backend", raw }, { status: 500 });
    }

    return NextResponse.json(data, { status: res.status });
}
