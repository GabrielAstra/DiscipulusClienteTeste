"use client";
import { useUsuario } from "@/context/UsuarioContext";
import Cabecalho from "./Cabecalho";
import { useRouter, usePathname } from "next/navigation";
import { useModal } from "@/context/ModalContext";

export default function CabecalhoClient() {
  const usuarioContext = useUsuario();
  const navegar = useRouter();
  const { modalAberto } = useModal();
  const pathname = usePathname();

  if (modalAberto) return null;
  if (pathname.startsWith("/checkout")) return null;

  return (
    <Cabecalho usuario={usuarioContext.usuario} aoFazerLogout={async () => {
      await usuarioContext.realizarLogout();
      navegar.push("/login");
    }} />
  );
}
