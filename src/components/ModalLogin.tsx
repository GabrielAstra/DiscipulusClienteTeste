"use client";
import React, { useState } from "react";
import { X, Eye, EyeOff, Mail, Lock, User, UserCheck } from "lucide-react";

interface PropriedadesModalLogin {
  aberto: boolean;
  aoFechar: () => void;
  aoFazerLogin: (usuario: any) => void;
}

export default function ModalLogin({
  aberto,
  aoFechar,
  aoFazerLogin,
}: PropriedadesModalLogin) {
  const [modo, setModo] = useState<"entrar" | "cadastrar">("entrar");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const [dadosLogin, setDadosLogin] = useState({
    email: "",
    senha: "",
  });

  const [dadosCadastro, setDadosCadastro] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    papel: "estudante",
  });

  if (!aberto) return null;

  const lidarComLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);

    setTimeout(() => {
      const usuario = {
        id: "1",
        nome: "João Silva",
        email: dadosLogin.email,
        papel: "estudante",
      };
      aoFazerLogin(usuario);
      setCarregando(false);
      aoFechar();
      setDadosLogin({ email: "", senha: "" });
    }, 1000);
  };

  const lidarComCadastro = async (e: React.FormEvent) => {
    e.preventDefault();

    if (dadosCadastro.senha !== dadosCadastro.confirmarSenha) {
      alert("As senhas não coincidem");
      return;
    }

    setCarregando(true);

    setTimeout(() => {
      const usuario = {
        id: "1",
        nome: dadosCadastro.nome,
        email: dadosCadastro.email,
        papel: dadosCadastro.papel,
      };
      aoFazerLogin(usuario);
      setCarregando(false);
      aoFechar();
      setDadosCadastro({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        papel: "estudante",
      });
    }, 1000);
  };

  const lidarComFechar = () => {
    aoFechar();
    setModo("entrar");
    setDadosLogin({ email: "", senha: "" });
    setDadosCadastro({
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
      papel: "estudante",
    });
    setMostrarSenha(false);
    setMostrarConfirmarSenha(false);
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img
              src="/BrancoComFundoPreto.jpg"
              alt="Discipulus"
              className="h-8 w-8 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {modo === "entrar" ? "Entre na sua conta" : "Crie sua conta"}
              </h2>
              <p className="text-sm text-gray-600">Para agendar uma aula</p>
            </div>
          </div>
          <button
            onClick={lidarComFechar}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {modo === "entrar" ? (
            <form onSubmit={lidarComLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
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
                    onChange={(e) =>
                      setDadosLogin({ ...dadosLogin, email: e.target.value })
                    }
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Digite seu email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
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
                    onChange={(e) =>
                      setDadosLogin({ ...dadosLogin, senha: e.target.value })
                    }
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Digite sua senha"
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

              <button
                type="submit"
                disabled={carregando}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {carregando ? "Entrando..." : "Entrar"}
              </button>
            </form>
          ) : (
            <form onSubmit={lidarComCadastro} className="space-y-4">
              <div>
                <label
                  htmlFor="register-name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nome completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="register-name"
                    type="text"
                    required
                    value={dadosCadastro.nome}
                    onChange={(e) =>
                      setDadosCadastro({
                        ...dadosCadastro,
                        nome: e.target.value,
                      })
                    }
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Digite seu nome completo"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="register-email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="register-email"
                    type="email"
                    required
                    value={dadosCadastro.email}
                    onChange={(e) =>
                      setDadosCadastro({
                        ...dadosCadastro,
                        email: e.target.value,
                      })
                    }
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Digite seu email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="register-role"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Eu quero
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserCheck className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="register-role"
                    value={dadosCadastro.papel}
                    onChange={(e) =>
                      setDadosCadastro({
                        ...dadosCadastro,
                        papel: e.target.value,
                      })
                    }
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="estudante">Aprender como estudante</option>
                    <option value="professor">Ensinar como professor</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="register-password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="register-password"
                    type={mostrarSenha ? "text" : "password"}
                    required
                    value={dadosCadastro.senha}
                    onChange={(e) =>
                      setDadosCadastro({
                        ...dadosCadastro,
                        senha: e.target.value,
                      })
                    }
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                <label
                  htmlFor="register-confirm-password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirmar senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="register-confirm-password"
                    type={mostrarConfirmarSenha ? "text" : "password"}
                    required
                    value={dadosCadastro.confirmarSenha}
                    onChange={(e) =>
                      setDadosCadastro({
                        ...dadosCadastro,
                        confirmarSenha: e.target.value,
                      })
                    }
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Confirme sua senha"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() =>
                      setMostrarConfirmarSenha(!mostrarConfirmarSenha)
                    }
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
                  id="agree-terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="agree-terms"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Eu concordo com os{" "}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    Termos de Serviço
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={carregando}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {carregando ? "Criando conta..." : "Criar conta"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {modo === "entrar" ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
              <button
                onClick={() =>
                  setModo(modo === "entrar" ? "cadastrar" : "entrar")
                }
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {modo === "entrar" ? "Cadastre-se" : "Faça login"}
              </button>
            </p>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Ou continue com
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span>Google</span>
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span>Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
