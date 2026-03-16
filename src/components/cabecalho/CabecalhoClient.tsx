"use client";
import { useUsuario } from "@/context/UsuarioContext";
import Cabecalho from "./Cabecalho";
import { useRouter } from "next/navigation";
import { useModal } from "@/context/ModalContext";

export default function CabecalhoClient() {
  const usuarioContext = useUsuario();
  const navegar = useRouter();
  const { modalAberto } = useModal();

  async function aoFazerLogout() {
    await usuarioContext.realizarLogout();
    navegar.push("/login");
  }

  if (modalAberto) return null;

  return (
    <Cabecalho usuario={usuarioContext.usuario} aoFazerLogout={aoFazerLogout} />
  );
}
