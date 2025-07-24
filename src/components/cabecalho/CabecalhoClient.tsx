"use client";
import { useUsuario } from "@/context/UsuarioContext";
import Cabecalho from "./Cabecalho";
import { useRouter } from "next/navigation";

export default function CabecalhoClient() {
  const usuarioContext = useUsuario();
  const navegar = useRouter();

  function aoFazerLogout(): void {
    usuarioContext.realizarLogout();
    navegar.push("/login");
  }

  return (
    <Cabecalho usuario={usuarioContext.usuario} aoFazerLogout={aoFazerLogout} />
  );
}
