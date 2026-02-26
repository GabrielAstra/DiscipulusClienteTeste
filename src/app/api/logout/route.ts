import { NextRequest, NextResponse } from "next/server";
import { realizarLogout } from "@/lib/service/logout/logout.service";

export async function POST(req: NextRequest) {
  try {

    const refreshToken = req.cookies.get("refreshToken")?.value;

    const response = await realizarLogout(refreshToken ?? "");

    const res = NextResponse.json(response);


    res.cookies.set("token", "", {
      expires: new Date(0),
      path: "/",
    });

    res.cookies.set("refreshToken", "", {
      expires: new Date(0),
      path: "/",
    });

    return res;

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Erro ao realizar logout" },
      { status: 500 }
    );
  }
}