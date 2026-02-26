"use client";
import { useUsuario } from "@/context/UsuarioContext";
import Cabecalho from "./Cabecalho";
import { useRouter } from "next/navigation";

export default function CabecalhoClient() {
  const usuarioContext = useUsuario();
  const navegar = useRouter();

  async function aoFazerLogout() {
  await usuarioContext.realizarLogout();
  navegar.push("/login");
}

  return (
    <Cabecalho usuario={usuarioContext.usuario} aoFazerLogout={aoFazerLogout} />
  );
}
