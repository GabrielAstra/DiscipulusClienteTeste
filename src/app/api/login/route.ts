import { login } from "@/lib/service/auth/auth.service";
import { IResponse } from "@/types/response";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const response = await login(body);

  const { message, success, data } = response;
  var responseBody: IResponse<void>;

  if (!success) {
    responseBody = IResponse.fail(message);
    const stringfied = JSON.stringify(responseBody);
    return NextResponse.json(stringfied, { status: 401 });
  }

  responseBody = IResponse.ok(message);
  const stringfied = JSON.stringify(responseBody);
  const res = NextResponse.json(stringfied);

  console.log(data);

  // Set HttpOnly cookie for token
  res.cookies.set("token", data?.token!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res;
}
