// src/app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import CabecalhoClient from "@/components/cabecalho/CabecalhoClient";
import { UsuarioProvider } from "../context/UsuarioContext";
import { ToastProvider } from "@/context/ToastContext";
import { Toaster } from "sonner";
import { SignalRProvider } from '@/context/SignalRContext';
import { Sign } from "crypto";
import { Shrikhand } from 'next/font/google'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
})


const shrikhand = Shrikhand({
  subsets: ['latin'],
  weight: '400', 
  display: 'swap',
});


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
      <body className="">
        <UsuarioProvider>
          <ToastProvider>
            <SignalRProvider>
              <CabecalhoClient />
                {children}
              <Toaster position="top-right" richColors />
            </SignalRProvider>
          </ToastProvider>
        </UsuarioProvider>
      </body>
    </html>
  );
}
