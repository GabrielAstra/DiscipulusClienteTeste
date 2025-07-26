import { listarHabilidades } from "@/lib/service/habilidade/habilidade.service";
import { IResponse } from "@/types/response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest) {
  const response = await listarHabilidades();
  const { data, success, message } = response;
  if (!success) {
    return NextResponse.json(IResponse.fail(message), { status: 400 });
  }

  return NextResponse.json(IResponse.success(data));
}
