import { NextResponse } from "next/server";
import { listarConversasService } from "@/lib/service/chat/chat.service";

export async function GET() {
    const result = await listarConversasService();

    if (!result.success) {
        return NextResponse.json(
            { success: false, message: result.message },
            { status: 400 }
        );
    }

    return NextResponse.json(result.data);
}