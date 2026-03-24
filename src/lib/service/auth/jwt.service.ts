import { Usuario } from "@/types/usuario";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

interface JwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  papel: "Professor" | "Aluno";
  [key: string]: string;
}

export async function getCurrentUser(): Promise<Usuario | null> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;
  const claims = jwtDecode<JwtPayload>(token);
  const usuario: Usuario = {
    id: claims[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ],
    nome: claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
    email:
      claims[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ],
    papel: claims["papel"],
    role: claims[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ],
  };
  return usuario;
}
