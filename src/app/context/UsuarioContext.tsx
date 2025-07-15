"use client";

import { Usuario } from "@/model/usuario";
import { createContext, useContext, useState } from "react";

interface UsuarioContextType {
  usuario: Usuario | null;
  lidarComLogin: (usuario: Usuario) => void;
  lidarComLogout: () => void;
}

const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

export function UsuarioProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const lidarComLogin = (dadosUsuario: Usuario) => {
    setUsuario(dadosUsuario);
  };

  const lidarComLogout = () => {
    setUsuario(null);
  };

  return (
    <UsuarioContext.Provider value={{ usuario, lidarComLogin, lidarComLogout }}>
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