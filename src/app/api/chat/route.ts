import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_DISCIPULUS_API_URL
export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json(
            { success: false, message: "Sem token" },
            { status: 401 }
        );
    }

    const res = await fetch(`${API_URL}/Chat/ListarConversas`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();
    return NextResponse.json(data);
}


