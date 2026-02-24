import { excluirExperiencia } from "@/lib/service/experiencia/experiencia.service";
import { NextRequest } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    if (!id) {
        return new Response(
            JSON.stringify({ success: false, message: "ID não informado" }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    const resultado = await excluirExperiencia(id);

    return new Response(JSON.stringify(resultado), {
        status: resultado.success ? 200 : 400,
        headers: { "Content-Type": "application/json" },
    });
}