import { cookies } from "next/headers";

export async function fetchWithAuth(
    input: RequestInfo,
    init?: RequestInit,
    requireAuth: boolean = true
): Promise<Response> {

    const cookieStore = await cookies();
    let token = cookieStore.get("token")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (requireAuth && !token) {
        return new Response(null, { status: 401 });
    }

    let headers: HeadersInit = {
        ...init?.headers,
    };

    if (token) {
        headers = {
            ...headers,
            Authorization: `Bearer ${token}`,
        };
    }

    let response = await fetch(input, {
        ...init,
        headers,
    });

    if (response.status === 401 && refreshToken) {

        const refreshResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Home/refresh`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken }),
            }
        );

        if (!refreshResponse.ok) {
            return response;
        }

        const data = await refreshResponse.json();

        cookieStore.set("token", data.accessToken);
        cookieStore.set("refreshToken", data.refreshToken);

        headers = {
            ...headers,
            Authorization: `Bearer ${data.accessToken}`,
        };

        response = await fetch(input, {
            ...init,
            headers,
        });
    }

    return response;
}