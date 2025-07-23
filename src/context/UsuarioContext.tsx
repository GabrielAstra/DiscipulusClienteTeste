"use client";

import { ILoginRequest } from "@/lib/service/auth/auth.service";
import { Usuario } from "@/types/usuario";
import { createContext, useContext, useEffect, useState } from "react";

interface UsuarioContextType {
  usuario: Usuario | null;
  refreshUser: () => Promise<void>;
  realizarLogin: (payload: ILoginRequest) => Promise<void>;
  realizarLogout: () => void;
  loading: boolean;
}

const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

export function UsuarioProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchUser() {
    setLoading(true);
    try {
      const res = await fetch("/api/me");
      if (res.ok) {
        const data = await res.json();
        setUsuario(data.usuario);
      } else {
        setUsuario(null);
      }
    } finally {
      setLoading(false);
    }
  }

  async function realizarLogin(payload: ILoginRequest) {
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await fetchUser();
      }
    } finally {
      setLoading(false);
    }
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
