import { signup } from "@/lib/service/auth/auth.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { message, success, data } = await signup(body);

  if (!success) {
    return NextResponse.json(
      { success: false, message: message || "Erro ao criar conta" },
      { status: 400 }
    );
  }

  const res = NextResponse.json({ 
    success: true, 
    message: message || "Conta criada com sucesso" 
  });

  // Set HttpOnly cookies for tokens
  res.cookies.set("token", data?.accessToken!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 15,
  });

  res.cookies.set("refreshToken", data?.refreshToken!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return res;
}
