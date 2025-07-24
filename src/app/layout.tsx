// src/app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import CabecalhoClient from "@/components/cabecalho/CabecalhoClient";
import { UsuarioProvider } from "../context/UsuarioContext";
import { ToastProvider } from "@/context/ToastContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Discipulus App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <UsuarioProvider>
          <ToastProvider>
            <CabecalhoClient />
            {children}
            <Toaster position="top-right" richColors />
          </ToastProvider>
        </UsuarioProvider>
      </body>
    </html>
  );
}
