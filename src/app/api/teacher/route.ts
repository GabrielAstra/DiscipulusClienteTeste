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



    const data = await res.json();
    return NextResponse.json(data);
}
