import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = "http://localhost:5156/Chat/ObterMensagens";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const conversaId = searchParams.get("conversaId");

    if (!conversaId) {
        return NextResponse.json(
            { success: false, message: "conversaId obrigatório" },
            { status: 400 }
        );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json(
            { success: false, message: "Sem token" },
            { status: 401 }
        );
    }

    const res = await fetch(
        `${API_URL}?conversaId=${encodeURIComponent(conversaId)}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await res.json();
    return NextResponse.json(data);
}
