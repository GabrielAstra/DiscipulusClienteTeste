"use client";
import React, { useState, useEffect } from "react";
import { X, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { ILoginRequest } from "@/lib/service/auth/auth.service";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";

interface PropriedadesModalLogin {
  aberto: boolean;
  aoFechar: () => void;
  aoFazerLogin: (usuario: ILoginRequest) => void;
}

export default function ModalLogin({ aberto, aoFechar, aoFazerLogin }: PropriedadesModalLogin) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [dadosLogin, setDadosLogin] = useState({ email: "", senha: "" });
  const { abrirModal, fecharModal } = useModal();

  useEffect(() => {
    if (aberto) abrirModal();
    else fecharModal();
    return () => fecharModal();
  }, [aberto]);

  if (!aberto) return null;

  const lidarComLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    aoFazerLogin({ email: dadosLogin.email, password: dadosLogin.senha, lembrarLogin: false });
    setCarregando(false);
  };

  const lidarComFechar = () => {
    aoFechar();
    setDadosLogin({ email: "", senha: "" });
    setMostrarSenha(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img src="/BrancoComFundoPreto.jpg" alt="Discipulus" className="h-8 w-8 rounded-lg object-cover" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Entre na sua conta</h2>
              <p className="text-sm text-gray-600">Para agendar uma aula</p>
            </div>
          </div>
          <button onClick={lidarComFechar} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={lidarComLogin} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={dadosLogin.email}
                  onChange={(e) => setDadosLogin({ ...dadosLogin, email: e.target.value })}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Digite seu email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="login-password"
                  type={mostrarSenha ? "text" : "password"}
                  required
                  value={dadosLogin.senha}
                  onChange={(e) => setDadosLogin({ ...dadosLogin, senha: e.target.value })}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Digite sua senha"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                  {mostrarSenha ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <Link href="/register" onClick={lidarComFechar} className="font-medium text-indigo-600 hover:text-indigo-500">
                Cadastre-se
              </Link>
            </p>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continue com</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Google
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
