import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_DISCIPULUS_API_URL;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const res = await fetch(`${API_URL}/Arquivo/avatar/${id}`, {
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
