'use client';

import { Lock, Home, ArrowLeft, BookOpen, AlertTriangle } from 'lucide-react';
import { Link } from '@/components/Link';

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen flex items-center">
        <div className="w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center bg-red-100 border border-red-200 rounded-full px-4 py-2 mb-6">
              <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
              <span className="text-sm font-medium text-red-700">Erro 403 - Acesso Negado</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Ops! Você não tem
              <span className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent block">
                permissão aqui
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Parece que você tentou acessar uma área restrita da nossa plataforma educacional.
              Não se preocupe, até os melhores alunos às vezes pegam o corredor errado!
            </p>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-indigo-100 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <BookOpen className="w-5 h-5 text-indigo-600 mr-2" />
                Possíveis motivos:
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>Você precisa fazer login para acessar esta área</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>Seu plano atual não inclui acesso a este conteúdo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>Esta página é exclusiva para professores cadastrados</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>O link pode estar incorreto ou expirado</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.history.back()}
                className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Voltar</span>
              </button>

              <Link
                href="/"
                className="group border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center space-x-3 backdrop-blur-sm bg-white/80 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Home className="w-5 h-5" />
                <span>Ir para Início</span>
              </Link>
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-green-700">Dica:</span> Se você é um estudante,
                <Link href="/catalog" className="text-indigo-600 hover:text-indigo-700 font-semibold mx-1">
                  explore nosso catálogo
                </Link>
                para encontrar professores incríveis!
              </p>
            </div>
          </div>

          <div className="order-1 md:order-2 relative">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-3xl transform rotate-3 opacity-10"></div>

              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="relative">
                  <div className="w-full aspect-square bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-2xl flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute w-32 h-32 bg-indigo-300 rounded-full animate-ping opacity-20"></div>
                      <div className="absolute w-48 h-48 bg-purple-300 rounded-full animate-pulse opacity-30"></div>
                    </div>

                    <div className="relative z-10">
                      <div className="w-48 h-48 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce" style={{ animationDuration: '3s' }}>
                        <Lock className="w-24 h-24 text-white" strokeWidth={2.5} />
                      </div>
                    </div>

                    <div className="absolute top-8 left-8 w-16 h-16 bg-yellow-400 rounded-lg transform -rotate-12 animate-pulse shadow-lg flex items-center justify-center">
                      <span className="text-3xl">🔒</span>
                    </div>

                    <div className="absolute bottom-8 right-8 w-16 h-16 bg-red-400 rounded-lg transform rotate-12 animate-pulse delay-500 shadow-lg flex items-center justify-center" style={{ animationDelay: '0.5s' }}>
                      <span className="text-3xl">⛔</span>
                    </div>

                    <div className="absolute top-1/2 left-4 w-12 h-12 bg-orange-400 rounded-full animate-bounce shadow-lg flex items-center justify-center" style={{ animationDelay: '0.3s', animationDuration: '2s' }}>
                      <span className="text-2xl">🚫</span>
                    </div>

                    <div className="absolute top-1/4 right-12 w-12 h-12 bg-blue-400 rounded-full animate-bounce shadow-lg flex items-center justify-center" style={{ animationDelay: '0.7s', animationDuration: '2.5s' }}>
                      <span className="text-2xl">🔐</span>
                    </div>

                    <div className="absolute bottom-1/4 left-12 w-10 h-10 bg-pink-400 rounded-lg transform rotate-45 animate-spin shadow-lg flex items-center justify-center" style={{ animationDuration: '4s' }}>
                      <span className="text-xl transform -rotate-45">⚠️</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-2xl">📚</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Aprenda com os melhores</p>
                      <p className="text-xs text-gray-600">Mais de 1000 professores disponíveis</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-2xl">🎓</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Aulas personalizadas</p>
                      <p className="text-xs text-gray-600">Metodologia adaptada para você</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-pink-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Precisa de ajuda?
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/login"
              className="group bg-gradient-to-br from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 p-6 rounded-xl transition-all duration-300 border border-indigo-200 hover:shadow-lg text-center"
            >
              <div className="text-4xl mb-3">🔑</div>
              <h4 className="font-semibold text-gray-900 mb-2">Fazer Login</h4>
              <p className="text-sm text-gray-600">Acesse sua conta de estudante</p>
            </Link>

            <Link
              href="/pricing"
              className="group bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 p-6 rounded-xl transition-all duration-300 border border-purple-200 hover:shadow-lg text-center"
            >
              <div className="text-4xl mb-3">💎</div>
              <h4 className="font-semibold text-gray-900 mb-2">Ver Planos</h4>
              <p className="text-sm text-gray-600">Escolha o melhor para você</p>
            </Link>

            <Link
              href="/contact"
              className="group bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 p-6 rounded-xl transition-all duration-300 border border-blue-200 hover:shadow-lg text-center"
            >
              <div className="text-4xl mb-3">💬</div>
              <h4 className="font-semibold text-gray-900 mb-2">Falar Conosco</h4>
              <p className="text-sm text-gray-600">Suporte sempre disponível</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
