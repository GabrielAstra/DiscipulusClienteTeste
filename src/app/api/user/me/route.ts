import { getCurrentUser } from "@/lib/service/auth/jwt.service";
import { IResponse } from "@/types/response";
import { NextResponse } from "next/server";

export async function GET() {
  const usuario = await getCurrentUser();
  const response: IResponse<any> = {
    message: "Usuário não autenticado",
    success: false,
    data: null,
  };
  if (!usuario) {
    return NextResponse.json(response, { status: 401 });
  }

  response.message = undefined;
  response.success = true;
  response.data = usuario;

  return NextResponse.json(response);
}
