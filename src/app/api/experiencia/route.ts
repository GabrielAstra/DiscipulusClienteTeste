import { listarExperiencias } from "@/lib/service/experiencia/experiencia.service";

export async function GET() {
  const resultado = await listarExperiencias();

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