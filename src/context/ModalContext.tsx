"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  modalAberto: boolean;
  abrirModal: () => void;
  fecharModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  modalAberto: false,
  abrirModal: () => {},
  fecharModal: () => {},
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalAberto, setModalAberto] = useState(false);
  return (
    <ModalContext.Provider value={{
      modalAberto,
      abrirModal: () => setModalAberto(true),
      fecharModal: () => setModalAberto(false),
    }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
