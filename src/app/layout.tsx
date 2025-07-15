import CabecalhoClient from "@/components/cabecalho/CabecalhoClient";
import type { Metadata } from "next";
import "./globals.css";
import { UsuarioProvider } from "./context/UsuarioContext";

export const metadata: Metadata = {
  title: "Discipulus App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <UsuarioProvider>
          <CabecalhoClient />
          {children}
        </UsuarioProvider>
      </body>
    </html>
  );
}
