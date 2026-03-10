'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useUsuario } from '@/context/UsuarioContext';

type SignalRContextType = {
  connection: signalR.HubConnection | null;
};

const SignalRContext = createContext<SignalRContextType>({
  connection: null,
});

export function SignalRProvider({ children }: { children: React.ReactNode }) {
  const { usuario } = useUsuario();
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

  useEffect(() => {
    if (!usuario) {
      setConnection(null);
      return;
    }

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(process.env.NEXT_PUBLIC_DISCIPULUS_API_URL_CHATHUB!, {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    newConnection.start()
      .then(() => {
        console.log('SignalR conectado');
        setConnection(newConnection);
      })
      .catch((err) => {
        console.error('Erro ao conectar SignalR:', err);
      });

    return () => {
      newConnection.stop();
      setConnection(null);
    };
  }, [usuario]);

  return (
    <SignalRContext.Provider value={{ connection }}>
      {children}
    </SignalRContext.Provider>
  );
}

export function useSignalR() {
  return useContext(SignalRContext);
}
