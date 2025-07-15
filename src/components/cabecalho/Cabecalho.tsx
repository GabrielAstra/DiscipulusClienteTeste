import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PropriedadesCabecalho {
  usuario: any;
  aoFazerLogout: () => void;
}

export default function Cabecalho({ usuario, aoFazerLogout }: PropriedadesCabecalho) {
  const localizacao = usePathname();

  const estaAtivo = (caminho: string) => localizacao === caminho;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
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
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  estaAtivo('/catalog')
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                Encontrar Professores
              </Link>
              {usuario && (
                <>
                  <Link
                    href="/schedule"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      estaAtivo('/schedule')
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                    }`}
                  >
                    Minhas Aulas
                  </Link>
                  {usuario.papel === 'professor' && (
                    <Link
                      href="/teacher-dashboard"
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        estaAtivo('/teacher-dashboard')
                          ? 'text-indigo-600 bg-indigo-50'
                          : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                      }`}
                    >
                      Painel Professor
                    </Link>
                  )}
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {usuario ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-indigo-600" />
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
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
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