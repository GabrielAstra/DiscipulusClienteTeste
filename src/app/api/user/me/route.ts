import { getCurrentUser } from "@/lib/service/auth/jwt.service";
import { IResponse } from "@/types/response";
import { Usuario } from "@/types/usuario";
import { NextResponse } from "next/server";

export async function GET() {
  const usuario = await getCurrentUser();
  const response: IResponse<Usuario> = {
    message: "Usuário não autenticado",
    success: false,
  };

  if (!usuario) {
    return NextResponse.json(response, { status: 401 });
  }

  response.message = undefined;
  response.success = true;
  response.data = usuario;

  return NextResponse.json(response);
}