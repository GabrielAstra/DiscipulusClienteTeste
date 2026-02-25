import { login } from "@/lib/service/auth/auth.service";
import { IResponse } from "@/types/response";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const response = await login(body);
  const { rememberMe } = body;

  const { message, success, data } = response;
  let responseBody: IResponse<void>;

  if (!success) {
    responseBody = IResponse.fail(message);
    return NextResponse.json(responseBody, { status: 401 });
  }

  responseBody = IResponse.ok(message);
  const res = NextResponse.json(responseBody);
  res.cookies.set("token", data?.token!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 15,
  });

  res.cookies.set("refreshToken", data?.tokenRefresh!, {
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