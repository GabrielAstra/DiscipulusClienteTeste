import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_DISCIPULUS_API_URL;

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ token: string }> }
) {
    const { token } = await params;
    const url = `${API_URL}/api/Checkout/${token}`;
    const res = await fetch(url);

    const raw = await res.text();
    if (!raw) {
        return NextResponse.json({ success: false, message: "Resposta vazia do backend" }, { status: 500 });
    }

    let data;
    try {
        data = JSON.parse(raw);
    } catch {
        return NextResponse.json({ success: false, message: "Resposta inválida do backend" }, { status: 500 });
    }

    return NextResponse.json(data, { status: res.status });
}
