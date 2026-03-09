import { obterProfessor } from "@/lib/service/teacher/obterProfessor.service";

export async function GET() {
  const resultado = await obterProfessor();

  if (!resultado.success) {
    return Response.json(resultado, { status: 400 });
  }

  return Response.json(resultado, { status: 200 });
}
