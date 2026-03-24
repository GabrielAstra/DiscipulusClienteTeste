import { excluirFormacao } from "@/lib/service/formacao/formacao.service";
import { cookies } from "next/headers";
import { ERRO_SEM_TOKEN } from "@/types/messages/error-messages";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
        return new Response(JSON.stringify({ success: false, message: ERRO_SEM_TOKEN }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    const { id } = await params;

    if (!id) {
        return new Response(JSON.stringify({ success: false, message: "ID não informado" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const resultado = await excluirFormacao(id);

    return new Response(JSON.stringify(resultado), {
        status: resultado.success ? 200 : 400,
        headers: { "Content-Type": "application/json" },
    });
}