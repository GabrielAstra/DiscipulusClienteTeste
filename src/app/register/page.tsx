'use client';
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cadastrarUsuario } from "@/service/api";
import { jwtDecode } from "jwt-decode";
interface PropriedadesCadastrar {
  aoFazerLogin: (usuario: any) => void;
}

export default function CadastroPage({ aoFazerLogin }: PropriedadesCadastrar) {
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    papel: 'estudante'
  });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const navegar = useRouter();
    interface JwtPayload {
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
        papel: "Professor" | "Aluno";
        [key: string]: any;
      }


  const lidarComEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    if (dadosFormulario.senha !== dadosFormulario.confirmarSenha) {
      alert("As senhas não coincidem");
      return;
    }

    setCarregando(true);

    try {
      const tipoUsuario = dadosFormulario.papel === "professor" ? 1 : 2;

      const resposta = await cadastrarUsuario({
        nome: dadosFormulario.nome,
        email: dadosFormulario.email,
        senha: dadosFormulario.senha,
        tipoUsuario,
      });

      // Salva token
      localStorage.setItem("token", resposta.token);

      // Decodifica token
      const decoded = jwtDecode<JwtPayload>(resposta.token);

      const usuario = {
        id: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        nome: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        papel: decoded["papel"],
        role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      };

      aoFazerLogin(usuario);
      navegar.push("/catalog");

    } catch (erro: any) {
      alert(erro.message || "Erro ao cadastrar");
    } finally {
      setCarregando(false);
    }
  };


  const lidarComMudancaInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDadosFormulario({
      ...dadosFormulario,
      [e.target.name]: e.target.value
    });
  };

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
          Crie sua conta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ou{' '}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            entre na sua conta existente
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10 border border-gray-200">
          <form className="space-y-6" onSubmit={lidarComEnvio}>
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome completo
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  required
                  value={dadosFormulario.nome}
                  onChange={lidarComMudancaInput}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Digite seu nome completo"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                  value={dadosFormulario.email}
                  onChange={lidarComMudancaInput}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Digite seu email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="papel" className="block text-sm font-medium text-gray-700">
                Eu quero
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCheck className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="papel"
                  name="papel"
                  value={dadosFormulario.papel}
                  onChange={lidarComMudancaInput}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="estudante">Aprender como estudante</option>
                  <option value="professor">Ensinar como professor</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="senha"
                  name="senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={dadosFormulario.senha}
                  onChange={lidarComMudancaInput}
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Crie uma senha"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                  {mostrarSenha ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700">
                Confirmar senha
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmarSenha"
                  name="confirmarSenha"
                  type={mostrarConfirmarSenha ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={dadosFormulario.confirmarSenha}
                  onChange={lidarComMudancaInput}
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Confirme sua senha"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                >
                  {mostrarConfirmarSenha ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="aceitar-termos"
                name="aceitar-termos"
                type="checkbox"
                required
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="aceitar-termos" className="ml-2 block text-sm text-gray-900">
                Eu concordo com os{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Termos de Serviço
                </a>{' '}
                e{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Política de Privacidade
                </a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={carregando}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {carregando ? 'Criando conta...' : 'Criar conta'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continue com</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span>Google</span>
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span>Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}