'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
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
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    if (!usuario) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(process.env.NEXT_PUBLIC_DISCIPULUS_API_URL!, {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connection;

    connection.start()
      .then(() => console.log('SignalR conectado'))
      .catch(console.error);

    return () => {
      connection.stop();
    };
  }, [usuario]);

  return (
    <SignalRContext.Provider value={{ connection: connectionRef.current }}>
      {children}
    </SignalRContext.Provider>
  );
}

export function useSignalR() {
  return useContext(SignalRContext);
}
