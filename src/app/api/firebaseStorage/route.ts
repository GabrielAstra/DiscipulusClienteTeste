import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_DISCIPULUS_API_URL
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;


  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(
      `${API_URL}/Arquivo/SalvarFirebaseStorage`,
      {
        method: "POST",
        headers,
      }
    );

    const raw = await res.text();

    if (!raw) {
      return NextResponse.json(
        { success: false, message: "Resposta vazia da API!" },
        { status: 500 }
      );
    }

    return NextResponse.json(JSON.parse(raw));
  } catch (error) {
    console.error("ERRO AO salvar imagem:", error);
    return NextResponse.json(
      { success: false, message: "Erro inesperado ao salvar." },
      { status: 500 }
    );
  }
}
