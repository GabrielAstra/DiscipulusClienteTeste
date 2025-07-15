'use client';
import { useUsuario } from '@/app/context/UsuarioContext';
import Cabecalho from './Cabecalho';

export default function CabecalhoClient() {
  const usuarioContext = useUsuario();

  return <Cabecalho usuario={usuarioContext.usuario} aoFazerLogout={usuarioContext.lidarComLogout} />;
}
