import { ERRO_REQUISICAO } from "@/types/messages/error-messages";
import { IServiceResponse } from "@/types/response";
import { fetchWithAuth } from "@/lib/helper/fetchWithAuth";
import { ca } from "date-fns/locale";


export interface Logout {
    tokenRefresh: string;
}


export async function realizarLogout(tokenRefresh: string) {
    try {
        const response = await fetchWithAuth(
            `${process.env.NEXT_PUBLIC_DISCIPULUS_API_URL}/Home/logout`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tokenRefresh: tokenRefresh
                })
            }
        );

        return response;

    } catch (error) {
        console.error(error);
        return { success: false, message: ERRO_REQUISICAO };
    }
}