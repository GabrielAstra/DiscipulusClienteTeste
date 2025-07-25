import { IResponse } from "@/types/response";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const responseBody = IResponse.ok("Logout successful");

  const res = NextResponse.json(responseBody);

  res.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0), // 👈 expire the cookie immediately
  });

  return res;
}
