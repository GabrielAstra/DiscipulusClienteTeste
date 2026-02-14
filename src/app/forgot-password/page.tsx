"use client";

import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  const lidarComEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

   
  };

  if (enviado) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Email enviado!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enviamos um link de recuperação para
          </p>
          <p className="text-center text-sm font-medium text-gray-900">
            {email}
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10 border border-gray-200">
            <div className="space-y-4">
              <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
                <h3 className="text-sm font-medium text-blue-900 mb-2">
                  Próximos passos:
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                  <li>Verifique sua caixa de entrada</li>
                  <li>Clique no link de recuperação no email</li>
                  <li>Crie uma nova senha segura</li>
                </ol>
              </div>

              <div className="text-sm text-gray-600 text-center">
                Não recebeu o email?{" "}
                <button
                  onClick={() => setEnviado(false)}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Enviar novamente
                </button>
              </div>

              <div className="pt-4">
                <Link
                  href="/login"
                  className="flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar para o login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img
            src="/BrancoComFundoPreto.jpg"
            alt="Discipulus"
            className="h-12 w-12 rounded-lg object-cover"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Recuperar senha
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Digite seu email e enviaremos um link para redefinir sua senha
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10 border border-gray-200">
          <form className="space-y-6" onSubmit={lidarComEnvio}>
            {erro && (
              <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                <p className="text-sm text-red-800">{erro}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Endereço de email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Digite seu email"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Enviando..." : "Enviar link de recuperação"}
              </button>
            </div>

            <div className="text-center">
              <Link
                href="/login"
                className="flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para o login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
