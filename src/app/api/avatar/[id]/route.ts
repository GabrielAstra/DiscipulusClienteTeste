import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_DISCIPULUS_API_URL;

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`${API_URL}/Arquivo/avatar/${params.id}`, {
    method: "GET",
  });

  if (!res.ok) {
    return new NextResponse(null, { status: 404 });
  }

  const buffer = await res.arrayBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": res.headers.get("content-type") || "image/png",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
