"use client"

import Link from "next/link";
import { Shrikhand } from 'next/font/google';
import { ArrowLeft, Search, Home } from 'lucide-react';

const shrikhand = Shrikhand({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center overflow-hidden relative px-4">

      <div className="absolute top-[-80px] left-[-80px] w-[350px] h-[350px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[350px] h-[350px] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

      <div className="relative z-10 max-w-2xl w-full text-center">

        <div className="flex flex-col items-center justify-center mb-6">
  <span
    className={`${shrikhand.className} select-none text-[160px] sm:text-[200px] font-extrabold bg-gradient-to-br from-indigo-200 via-purple-200 to-blue-200 bg-clip-text text-transparent leading-none`}
    style={{ letterSpacing: '-0.04em' }}
  >
    404
  </span>

  <img
    src="/404Image.png"
    alt="Estudante confuso - Página não encontrada"
    className="w-56 sm:w-72 drop-shadow-2xl -mt-6"
    style={{ filter: 'drop-shadow(0 20px 40px rgba(99,102,241,0.25))' }}
  />
</div>

        <h1 className={`${shrikhand.className} text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight`}>
          Página{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Não Encontrada
          </span>
        </h1>

        <p className="text-lg text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
          Ops! Parece que essa página se perdeu assim como um aluno antes da prova. 
          Vamos te ajudar a encontrar o caminho certo! 
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 inline-flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Voltar ao Início</span>
          </Link>

         
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-indigo-100 rounded-2xl px-8 py-6 shadow-lg inline-flex flex-wrap gap-x-8 gap-y-3 justify-center items-center">
          <span className="text-sm text-gray-400 font-medium">Links úteis:</span>
          {[
            { label: "Como funciona", href: "/demo" },
            { label: "Seja Professor", href: "/register" },
            { label: "Suporte", href: "/help" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-indigo-600 hover:text-purple-700 hover:underline transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p className="mt-10 text-sm text-gray-400">
          © 2025{" "}
          <span className="font-bold text-indigo-500">Discipulus</span>
          {" "}— A plataforma #1 de tutoria no Brasil
        </p>
        
      </div>
      
    </div>
    
  );
}