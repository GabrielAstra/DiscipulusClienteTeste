import { editarPerfilCompleto } from "@/lib/service/salvarPerfilCompleto/salvarPerfilCompleto.service";
import { cookies } from "next/headers";
import { ERRO_SEM_TOKEN } from "@/types/messages/error-messages";

export async function POST(request: Request) {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
        return new Response(
            JSON.stringify({ success: false, message: ERRO_SEM_TOKEN }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
    
    const body = await request.json();
    console.log("body:",JSON.stringify(body))
    const resultado = await editarPerfilCompleto(token, body);

    if (!resultado.success) {
        return new Response(
            JSON.stringify({ success: false, message: resultado.message }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    return new Response(
        JSON.stringify({ success: true }),
        {
            status: 200,
            headers: { "Content-Type": "application/json" },
        }
    );
}
