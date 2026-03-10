import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_DISCIPULUS_API_URL;

export async function POST() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Não autenticado" },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(`${API_URL}/Usuario/OnBoarding`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: "Erro ao completar onboarding" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao completar onboarding:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao completar onboarding" },
      { status: 500 }
    );
  }
}
