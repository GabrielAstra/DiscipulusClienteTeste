import { NextResponse } from "next/server";
import { fetchWithAuth } from "@/lib/helper/fetchWithAuth";

const API_URL = process.env.NEXT_PUBLIC_DISCIPULUS_API_URL;

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const res = await fetchWithAuth(
      `${API_URL}/Professor/Listar?${searchParams.toString()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
      false
    );

    const raw = await res.text();

    if (!raw) {
      return NextResponse.json(
        { success: false, message: "Resposta vazia da API!" },
        { status: 500 }
      );
    }

    const apiResponse = JSON.parse(raw);
    
    if (apiResponse.success !== undefined) {
      return NextResponse.json(apiResponse);
    }
    
    return NextResponse.json(apiResponse);

  } catch (error) {
    console.error("ERRO AO LISTAR PROFESSORES:", error);
    return NextResponse.json(
      { success: false, message: "Erro inesperado ao listar professores." },
      { status: 500 }
    );
  }
}
