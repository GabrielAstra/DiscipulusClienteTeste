import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
        return NextResponse.json({ success: false }, { status: 401 });
    }

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Home/refresh`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        }
    );

    if (!response.ok) {
        return NextResponse.json({ success: false }, { status: 401 });
    }

    const data = await response.json();

    const res = NextResponse.json({ success: true });

    res.cookies.set("token", data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 15,
    });

    // 🔁 Atualiza Refresh Token (IMPORTANTE)
    res.cookies.set("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    return res;
}