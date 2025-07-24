"use client";

import { ILoginRequest } from "@/lib/service/auth/auth.service";
import { IResponse } from "@/types/response";
import { Usuario } from "@/types/usuario";
import { createContext, useContext, useEffect, useState } from "react";

interface UsuarioContextType {
  usuario: Usuario | null;
  refreshUser: () => Promise<void>;
  realizarLogin: (payload: ILoginRequest) => Promise<IResponse<Usuario>>;
  realizarLogout: () => void;
  loading: boolean;
}

const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

export function UsuarioProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchUser() {
    setLoading(true);
    const res = await fetch("/api/user/me");
    if (res.ok) {
      const data = (await res.json()) as IResponse<Usuario>;
      setLoading(false);
      setUsuario(data.data!);
    } else {
      setLoading(false);
      setUsuario(null);
    }
  }

  async function realizarLogin(
    payload: ILoginRequest
  ): Promise<IResponse<Usuario>> {
    setLoading(true);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      setLoading(false);
      return { success: false };
    }

    const resUser = await fetch("/api/user/me");
    const data = (await resUser.json()) as IResponse<Usuario>;
    console.log(data);
    setUsuario(data?.data!);
    setLoading(false);
    return { success: true, data: data.data };
  }

  const realizarLogout = () => {
    setUsuario(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UsuarioContext.Provider
      value={{
        refreshUser: fetchUser,
        realizarLogin,
        realizarLogout,
        usuario,
        loading,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error("useUsuario must be used within a UsuarioProvider");
  }
  return context;
}
