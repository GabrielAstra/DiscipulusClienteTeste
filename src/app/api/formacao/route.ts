import { listarFormacoes } from "@/lib/service/formacao/formacao.service";
import { cookies } from 'next/headers'
import { ERRO_SEM_TOKEN } from '@/types/messages/error-messages'
export async function GET() {
  const cookieStore = cookies()
  const token = (await cookieStore).get('token')?.value
  if (!token) {
    return new Response(
      JSON.stringify({ success: false, message: ERRO_SEM_TOKEN }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  const resultado = await listarFormacoes(token);

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
    JSON.stringify({ success: true, data: resultado.data }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}