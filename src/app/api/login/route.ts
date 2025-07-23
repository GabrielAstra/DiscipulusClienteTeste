import { login } from "@/lib/service/auth/auth.service";
import { IResponse } from "@/types/response";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const response = await login(body);

  const { flag, mensagem, token } = response;

  const responseBody: IResponse<void> = {
    message: mensagem,
    success: flag,
  };

  if (!flag) {
    return NextResponse.json(responseBody, { status: 401 });
  }

  const res = NextResponse.json(responseBody);

  // Set HttpOnly cookie for token
  res.cookies.set("token", token!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res;
}
