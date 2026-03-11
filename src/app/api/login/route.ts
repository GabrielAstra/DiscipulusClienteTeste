import { login } from "@/lib/service/auth/auth.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const response = await login(body);
  const { rememberMe } = body;

  const { message, success, data } = response;

  if (!success) {
    return NextResponse.json(
      { success: false, message: message || "Erro ao fazer login" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ 
    success: true, 
    message: message || "Login realizado com sucesso" 
  });
  
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
    maxAge: rememberMe 
      ? 60 * 60 * 24 * 30  
      : 60 * 60 * 12,    
  });

  return res;
}
