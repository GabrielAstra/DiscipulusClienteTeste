'use client';

import { LogOut, User, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus_Jakarta_Sans } from 'next/font/google';
import type { Usuario } from '@/types/usuario';

interface PropriedadesCabecalho {
  usuario: Usuario | null;
  aoFazerLogout: () => void;
}
const plusJakartaSpans = Plus_Jakarta_Sans({
  weight: '300',
  subsets: ['latin'],
  display: 'swap'

})
export default function Cabecalho({ usuario, aoFazerLogout }: PropriedadesCabecalho) {
  const localizacao = usePathname();

  const estaAtivo = (caminho: string) => localizacao === caminho;

  return (
    <header className="sticky top-3 z-50 w-full bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* container flutuante */}
        <div className="flex justify-between items-center h-14 rounded-full bg-white/90 shadow-md border border-gray-100 px-5">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="/BrancoComFundoPreto.jpg"
                alt="Discipulus"
                className="h-8 w-8 rounded-lg object-cover"
              />
              <span className="text-xl font-bold text-gray-900">Discipulus</span>
            </Link>

            <nav className="hidden md:flex space-x-6">
              <Link
                href="/catalog"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${estaAtivo('/catalog')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
              >
                Encontrar Professores
              </Link>
              {usuario && (
                <>
                  <Link
                    href="/schedule"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${estaAtivo('/schedule')
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                  >
                    Minhas Aulas
                  </Link>
                  {usuario.papel === 'Professor' && (
                    <Link
                      href="/teacher-dashboard"
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${estaAtivo('/teacher-dashboard')
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                    >
                      Painel Professor
                    </Link>
                  )}
                  <Link
                    href="/messages"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${estaAtivo('/messages')
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Mensagens</span>
                  </Link>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {usuario ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{usuario.nome}</span>
                </div>
                <button
                  onClick={aoFazerLogout}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Sair"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="flex items-center space-x-3
                    border border-gray-300
                    text-black
                    px-4 py-2 rounded-full
                    text-sm font-medium
                    transition-all duration-200
                    hover:bg-[#6562ff] hover:text-white"
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-zinc-900" />
                  </div>
                  <span className={`${plusJakartaSpans}`}>Entrar</span>
                </Link>
                <Link
                  href="/register"
                  className="bg-[#6562ff] hover:bg-black text-white px-6 rounded-full py-3  text-sm font-medium transition-colors"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
