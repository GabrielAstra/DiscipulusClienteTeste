"use client";

import {
  Calendar,
  DollarSign,
  Edit3,
  Save,
  Star,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

interface PerfilProfessor {
  id: string;
  nome: string;
  email: string;
  avatar: string;
  biografia: string;
  materias: string[];
  valorHora: number;
  experiencia: string;
  idiomas: string[];
  disponibilidade: string[];
  formacao: string;
  certificacoes: string[];
  telefone: string;
  localizacao: string;
}

interface DadosCarteira {
  saldo: number;
  ganhosTotal: number;
  pagamentosPendentes: number;
  ganhosMensais: number;
  transacoes: Transacao[];
}

interface Transacao {
  id: string;
  tipo: "ganho" | "saque";
  valor: number;
  descricao: string;
  data: string;
  status: "concluido" | "pendente" | "falhou";
}

export default function PainelProfessor() {
  const [abaAtiva, setAbaAtiva] = useState<"perfil" | "carteira">("perfil");
  const [editando, setEditando] = useState(false);
  const [mostrarModalSaque, setMostrarModalSaque] = useState(false);
  const [valorSaque, setValorSaque] = useState("");
  const [metodoSaque, setMetodoSaque] = useState("pix");

  const [perfil, setPerfil] = useState<PerfilProfessor>({
    id: "1",
    nome: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    biografia:
      "Professora apaixonada por matemática e física com doutorado em Matemática Aplicada. Especializo-me em tornar conceitos complexos acessíveis e envolventes para estudantes de todos os níveis.",
    materias: ["Matemática", "Física", "Cálculo"],
    valorHora: 45,
    experiencia: "8 anos",
    idiomas: ["Português", "Inglês"],
    disponibilidade: ["Segunda", "Terça", "Quarta", "Sexta"],
    formacao: "Doutorado em Matemática Aplicada - USP",
    certificacoes: [
      "Certificação em Ensino Online",
      "Especialização em Didática",
    ],
    telefone: "+55 11 99999-9999",
    localizacao: "São Paulo, SP",
  });

  const [dadosCarteira] = useState<DadosCarteira>({
    saldo: 1250.5,
    ganhosTotal: 8750.0,
    pagamentosPendentes: 320.0,
    ganhosMensais: 2100.0,
    transacoes: [
      {
        id: "1",
        tipo: "ganho",
        valor: 45.0,
        descricao: "Aula de Matemática - João Silva",
        data: "2024-01-15",
        status: "concluido",
      },
      {
        id: "2",
        tipo: "ganho",
        valor: 90.0,
        descricao: "Aula de Física - Maria Santos",
        data: "2024-01-14",
        status: "concluido",
      },
      {
        id: "3",
        tipo: "saque",
        valor: -500.0,
        descricao: "Saque via PIX",
        data: "2024-01-10",
        status: "concluido",
      },
    ],
  });

  const lidarComSalvarPerfil = () => {
    setEditando(false);
    console.log("Perfil salvo:", perfil);
  };

  const lidarComSaque = () => {
    const valor = parseFloat(valorSaque);
    if (valor > 0 && valor <= dadosCarteira.saldo) {
      console.log("Solicitação de saque:", { valor, metodo: metodoSaque });
      setMostrarModalSaque(false);
      setValorSaque("");
      alert("Solicitação de saque enviada com sucesso!");
    }
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const formatarData = (dataString: string) => {
    return new Date(dataString).toLocaleDateString("pt-BR");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Painel do Professor
          </h1>
          <p className="text-gray-600">Gerencie seu perfil, aulas e ganhos</p>
        </div>

        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setAbaAtiva("perfil")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  abaAtiva === "perfil"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <User className="w-5 h-5 inline mr-2" />
                Meu Perfil
              </button>
              <button
                onClick={() => setAbaAtiva("carteira")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  abaAtiva === "carteira"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <DollarSign className="w-5 h-5 inline mr-2" />
                Carteira
              </button>
            </nav>
          </div>
        </div>

        {abaAtiva === "perfil" && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Informações Pessoais
                </h2>
                {!editando ? (
                  <button
                    onClick={() => setEditando(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Editar</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={lidarComSalvarPerfil}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Salvar</span>
                    </button>
                    <button
                      onClick={() => setEditando(false)}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancelar</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo
                    </label>
                    {editando ? (
                      <input
                        type="text"
                        value={perfil.nome}
                        onChange={(e) =>
                          setPerfil({ ...perfil, nome: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{perfil.nome}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    {editando ? (
                      <input
                        type="email"
                        value={perfil.email}
                        onChange={(e) =>
                          setPerfil({ ...perfil, email: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{perfil.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone
                    </label>
                    {editando ? (
                      <input
                        type="tel"
                        value={perfil.telefone}
                        onChange={(e) =>
                          setPerfil({ ...perfil, telefone: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{perfil.telefone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Localização
                    </label>
                    {editando ? (
                      <input
                        type="text"
                        value={perfil.localizacao}
                        onChange={(e) =>
                          setPerfil({ ...perfil, localizacao: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{perfil.localizacao}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valor por Hora (R$)
                    </label>
                    {editando ? (
                      <input
                        type="number"
                        value={perfil.valorHora}
                        onChange={(e) =>
                          setPerfil({
                            ...perfil,
                            valorHora: parseFloat(e.target.value),
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">R$ {perfil.valorHora}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experiência
                    </label>
                    {editando ? (
                      <input
                        type="text"
                        value={perfil.experiencia}
                        onChange={(e) =>
                          setPerfil({ ...perfil, experiencia: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{perfil.experiencia}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Formação
                    </label>
                    {editando ? (
                      <input
                        type="text"
                        value={perfil.formacao}
                        onChange={(e) =>
                          setPerfil({ ...perfil, formacao: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{perfil.formacao}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Idiomas
                    </label>
                    {editando ? (
                      <input
                        type="text"
                        value={perfil.idiomas.join(", ")}
                        onChange={(e) =>
                          setPerfil({
                            ...perfil,
                            idiomas: e.target.value.split(", "),
                          })
                        }
                        placeholder="Português, Inglês, Espanhol"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {perfil.idiomas.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Biografia
                </label>
                {editando ? (
                  <textarea
                    value={perfil.biografia}
                    onChange={(e) =>
                      setPerfil({ ...perfil, biografia: e.target.value })
                    }
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{perfil.biografia}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Matérias
                </h3>
                {editando ? (
                  <input
                    type="text"
                    value={perfil.materias.join(", ")}
                    onChange={(e) =>
                      setPerfil({
                        ...perfil,
                        materias: e.target.value.split(", "),
                      })
                    }
                    placeholder="Matemática, Física, Química"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {perfil.materias.map((materia) => (
                      <span
                        key={materia}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                      >
                        {materia}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Disponibilidade
                </h3>
                {editando ? (
                  <div className="space-y-2">
                    {[
                      "Segunda",
                      "Terça",
                      "Quarta",
                      "Quinta",
                      "Sexta",
                      "Sábado",
                      "Domingo",
                    ].map((dia) => (
                      <label key={dia} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={perfil.disponibilidade.includes(dia)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setPerfil({
                                ...perfil,
                                disponibilidade: [
                                  ...perfil.disponibilidade,
                                  dia,
                                ],
                              });
                            } else {
                              setPerfil({
                                ...perfil,
                                disponibilidade: perfil.disponibilidade.filter(
                                  (d) => d !== dia
                                ),
                              });
                            }
                          }}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm text-gray-700">{dia}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {[
                      "Segunda",
                      "Terça",
                      "Quarta",
                      "Quinta",
                      "Sexta",
                      "Sábado",
                      "Domingo",
                    ].map((dia) => (
                      <div
                        key={dia}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-700">{dia}</span>
                        <span
                          className={`text-sm font-medium ${
                            perfil.disponibilidade.includes(dia)
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        >
                          {perfil.disponibilidade.includes(dia)
                            ? "Disponível"
                            : "Indisponível"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {abaAtiva === "carteira" && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Saldo Disponível
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatarMoeda(dadosCarteira.saldo)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Ganhos Totais
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatarMoeda(dadosCarteira.ganhosTotal)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Pagamentos Pendentes
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatarMoeda(dadosCarteira.pagamentosPendentes)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Este Mês
                    </p>
                    <p className="text-2xl font-bold text-indigo-600">
                      {formatarMoeda(dadosCarteira.ganhosMensais)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Sacar Dinheiro
                </h3>
                <button
                  onClick={() => setMostrarModalSaque(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Solicitar Saque
                </button>
              </div>
              <p className="text-gray-600">
                Você pode sacar seu saldo disponível a qualquer momento. Os
                saques são processados em até 2 dias úteis.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Histórico de Transações
              </h3>
              <div className="space-y-4">
                {dadosCarteira.transacoes.map((transacao) => (
                  <div
                    key={transacao.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transacao.tipo === "ganho"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        {transacao.tipo === "ganho" ? (
                          <TrendingUp
                            className={`w-5 h-5 ${
                              transacao.tipo === "ganho"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          />
                        ) : (
                          <DollarSign className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {transacao.descricao}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatarData(transacao.data)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          transacao.tipo === "ganho"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transacao.tipo === "ganho" ? "+" : ""}
                        {formatarMoeda(transacao.valor)}
                      </p>
                      <p
                        className={`text-sm ${
                          transacao.status === "concluido"
                            ? "text-green-600"
                            : transacao.status === "pendente"
                            ? "text-orange-600"
                            : "text-red-600"
                        }`}
                      >
                        {transacao.status === "concluido"
                          ? "Concluído"
                          : transacao.status === "pendente"
                          ? "Pendente"
                          : "Falhou"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {mostrarModalSaque && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Solicitar Saque
                </h3>
                <button
                  onClick={() => setMostrarModalSaque(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor do Saque
                  </label>
                  <input
                    type="number"
                    value={valorSaque}
                    onChange={(e) => setValorSaque(e.target.value)}
                    placeholder="0,00"
                    max={dadosCarteira.saldo}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Saldo disponível: {formatarMoeda(dadosCarteira.saldo)}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Método de Saque
                  </label>
                  <select
                    value={metodoSaque}
                    onChange={(e) => setMetodoSaque(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="pix">PIX</option>
                    <option value="banco">Transferência Bancária</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setMostrarModalSaque(false)}
                    className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={lidarComSaque}
                    disabled={
                      !valorSaque ||
                      parseFloat(valorSaque) <= 0 ||
                      parseFloat(valorSaque) > dadosCarteira.saldo
                    }
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirmar Saque
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
