import { listarFormacoes } from "@/lib/service/formacao/formacao.service";


export async function GET() {

  const resultado = await listarFormacoes();

  if (!resultado.success) {
    return Response.json(resultado, { status: 400 });
  }

  return Response.json(resultado, { status: 200 });
}