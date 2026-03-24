// src/app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import CabecalhoClient from "@/components/cabecalho/CabecalhoClient";
import { UsuarioProvider } from "../context/UsuarioContext";
import { ToastProvider } from "@/context/ToastContext";
import { Toaster } from "sonner";
import { SignalRProvider } from '@/context/SignalRContext';
import { ModalProvider } from "@/context/ModalContext";


export const metadata: Metadata = {
  title: "Discipulus",
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/solid.css" />   
      </head>
      <body className="">
        <UsuarioProvider>
          <ToastProvider>
            <SignalRProvider>
              <ModalProvider>
                <CabecalhoClient />
                  {children}
                <Toaster position="top-right" richColors />
              </ModalProvider>
            </SignalRProvider>
          </ToastProvider>
        </UsuarioProvider>
      </body>
    </html>
  );
}
