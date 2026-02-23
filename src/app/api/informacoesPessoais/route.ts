import { listarInformacoesPessoais } from "@/lib/service/informacoesPessoais/informacoesPessoais.service";

export async function GET() {

    const resultado = await listarInformacoesPessoais();

    if (!resultado.success) {
        return Response.json(resultado, { status: 400 });
    }

    return Response.json(resultado, { status: 200 });
}