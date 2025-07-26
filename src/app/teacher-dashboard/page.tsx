"use client";

import { useToast } from "@/context/ToastContext";
import { Habilidade } from "@/types/habilidade";
import { ERRO_REQUISICAO } from "@/types/messages/error-messages";
import { IResponse } from "@/types/response";
import {
  Briefcase,
  Calendar,
  DollarSign,
  Edit3,
  GraduationCap,
  Plus,
  Save,
  Star,
  Trash2,
  TrendingUp,
  User,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";

interface FormacaoDTO {
  id: string;
  titulo: string;
  instituicao: string;
  dtInicio: string;
  dtConclusao: string;
}

interface ExperienciaDTO {
  id: string;
  titulo: string;
  instituicao: string;
  inicio: string;
  fim: string;
  descricao: string;
}

interface PerfilProfessor {
  id: string;
  nome: string;
  email: string;
  avatar: string;
  biografia: string;
  materias: string[];
  valorHora: number;
  experiencia: ExperienciaDTO[];
  idiomas: string[];
  disponibilidade: string[];
  formacao: FormacaoDTO[];
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

function aplicarMascaraTelefone(valor: string) {
  const apenasNumeros = valor.replace(/\D/g, "");

  let telefoneFormatado = "+";

  if (apenasNumeros.length > 0) {
    telefoneFormatado += apenasNumeros.slice(0, 2);
  }

  if (apenasNumeros.length >= 3) {
    telefoneFormatado += " " + apenasNumeros.slice(2, 4);
  }

  if (apenasNumeros.length >= 5) {
    telefoneFormatado += " " + apenasNumeros.slice(4, 9);
  }

  if (apenasNumeros.length >= 10) {
    telefoneFormatado += "-" + apenasNumeros.slice(9, 13);
  }

  return telefoneFormatado.trim();
}

export default function PainelProfessor() {
  const [abaAtiva, setAbaAtiva] = useState<"perfil" | "carteira">("perfil");
  const [editando, setEditando] = useState(false);
  const [mostrarModalSaque, setMostrarModalSaque] = useState(false);
  const [valorSaque, setValorSaque] = useState("");
  const [metodoSaque, setMetodoSaque] = useState("pix");
  const { showError, showSuccess } = useToast();
  const [perfil, setPerfil] = useState<PerfilProfessor>({
    id: "1",
    nome: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    biografia:
      "Professora apaixonada por matemática e física com doutorado em Matemática Aplicada. Especializo-me em tornar conceitos complexos acessíveis e envolventes para estudantes de todos os níveis.",
    materias: [],
    valorHora: 45,
    experiencia: [],
    idiomas: ["Português", "Inglês"],
    disponibilidade: ["Segunda", "Terça", "Quarta", "Sexta"],
    formacao: [],
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

  const [filtroHabilidade, setFiltroHabilidade] = useState("");
  const [todasHabilidades, setTodasHabilidades] = useState<Habilidade[]>([]);
  const [habilidadesFiltradas, setHabilidadesFiltradas] = useState<
    Habilidade[]
  >([]);

  // todasHabilidades.filter((hab) =>
  //   hab.nome.toLowerCase().includes(filtroMateria.toLowerCase())
  // );
  async function buscarFormacoes() {
    try {
      const res = await fetch(`/api/formacao`, {
        method: "GET",
      });
      const body = (await res.json()) as IResponse<FormacaoDTO[]>;

      if (!body.success) {
        showError(body.message ?? ERRO_REQUISICAO);
        return [];
      }

      return body.data ?? [];
    } catch (err) {
      console.error("Erro ao buscar formações:", err);
      showError("Erro ao buscar formações acadêmicas.");
      return [];
    }
  }

  async function buscarExperiencias() {
    try {
      const res = await fetch(`/api/experiencia`, {
        method: "GET",
      });
      const body = (await res.json()) as IResponse<ExperienciaDTO[]>;

      if (!body.success) {
        showError(body.message ?? ERRO_REQUISICAO);
        return [];
      }

      return body.data ?? [];
    } catch (err) {
      console.error("Erro ao buscar experiencias:", err);
      showError("Erro ao buscar experiëncias.");
      return [];
    }
  }
  async function removerExperiencia(id: string, index: number) {
   

    try {
      const res = await fetch(`/api/experiencia/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!result.success) {
        showError(result.message || "Erro ao remover experiência.");
        return;
      }
      const novasExperiencias = perfil.experiencia.filter((_, i) => i !== index);
      setPerfil({
        ...perfil,
        experiencia: novasExperiencias,
      });

      showSuccess(result.message || "Experiência removida com sucesso!");
    } catch (err) {
      console.error("Erro:", err);
      showError("Erro ao remover experiência.");
    }
  }


  async function buscarHabilidades() {
    const res = await fetch("/api/habilidade", { method: "GET" });
    const body = (await res.json()) as IResponse<Habilidade[]>;
    if (!body.success) {
      showError(body.message ?? ERRO_REQUISICAO);
      return [];
    }
    return body.data!;
  }

  useEffect(() => {
    if (editando) {
      buscarHabilidades().then((res) => {
        setTodasHabilidades(res);
        setHabilidadesFiltradas(res);
      });
    }
  }, [editando]);
  
  useEffect(() => {
  async function carregarFormacoes() {
      const formacoes = await buscarFormacoes();
      setPerfil((prev) => ({
        ...prev,
        formacao: formacoes,
      }));
    }

    carregarFormacoes();
  }, []);

  useEffect(() => {
  async function carregarExperiencias() {
      const experiencias = await buscarExperiencias();
      setPerfil((prev) => ({
        ...prev,
        experiencia: experiencias,
      }));
    }

    carregarExperiencias();
  }, []);

  useEffect(() => {
    const filtered = todasHabilidades.filter((tag) =>
      tag.nome.toLowerCase().includes(filtroHabilidade.toLowerCase())
    );
    setHabilidadesFiltradas(filtered);
  }, [filtroHabilidade, todasHabilidades]);

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

  const formatarDataInput = (dataString: string) => {
    return new Date(dataString).toISOString().split("T")[0];
  };

  const adicionarFormacao = () => {
    const novaFormacao: FormacaoDTO = {
      id:"",
      titulo: "",
      instituicao: "",
      dtInicio: new Date().toISOString(),
      dtConclusao: new Date().toISOString(),
    };
    setPerfil({
      ...perfil,
      formacao: [...perfil.formacao, novaFormacao],
    });
  };

  async function removerFormacao(id: string, index: number){

    
    try {
      const res = await fetch(`/api/formacao/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!result.success) {
        showError(result.message || "Erro ao remover formação.");
        return;
      }
      const novasFormacoes = perfil.formacao.filter((_, i) => i !== index);
      setPerfil({
        ...perfil,
        formacao: novasFormacoes,
      });

      showSuccess(result.message || "Formação removida com sucesso!");
    } catch (err) {
      console.error("Erro:", err);
      showError("Erro ao remover formação.");
    }
    
  };

  const atualizarFormacao = (
    index: number,
    campo: keyof FormacaoDTO,
    valor: string
  ) => {
    const novasFormacoes = [...perfil.formacao];
    novasFormacoes[index] = {
      ...novasFormacoes[index],
      [campo]: valor,
    };
    setPerfil({
      ...perfil,
      formacao: novasFormacoes,
    });
  };

  const adicionarExperiencia = () => {
    const novaExperiencia: ExperienciaDTO = {
      id: "",
      titulo: "",
      instituicao: "",
      inicio: new Date().toISOString(),
      fim: new Date().toISOString(),
      descricao: "",
    };
    setPerfil({
      ...perfil,
      experiencia: [...perfil.experiencia, novaExperiencia],
    });
  };

  const atualizarExperiencia = (
    index: number,
    campo: keyof ExperienciaDTO,
    valor: string
  ) => {
    const novasExperiencias = [...perfil.experiencia];
    novasExperiencias[index] = {
      ...novasExperiencias[index],
      [campo]: valor,
    };
    setPerfil({
      ...perfil,
      experiencia: novasExperiencias,
    });
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
                        readOnly
                        disabled
                        className="w-full p-3 border border-gray-200 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed"
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
                          setPerfil({
                            ...perfil,
                            telefone: aplicarMascaraTelefone(e.target.value),
                          })
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

            {/* Formação Acadêmica */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Formação Acadêmica
                  </h3>
                </div>
                {editando && (
                  <button
                    onClick={adicionarFormacao}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar Formação</span>
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {perfil.formacao.map((formacao, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    {editando ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-md font-medium text-gray-900">
                            Formação #{index + 1}
                          </h4>
                          <button
                            onClick={() => removerFormacao(formacao.id, index)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Título
                            </label>
                            <input
                              type="text"
                              value={formacao.titulo}
                              onChange={(e) =>
                                atualizarFormacao(
                                  index,
                                  "titulo",
                                  e.target.value
                                )
                              }
                              placeholder="Ex: Doutorado em Matemática"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Instituição
                            </label>
                            <input
                              type="text"
                              value={formacao.instituicao}
                              onChange={(e) =>
                                atualizarFormacao(
                                  index,
                                  "instituicao",
                                  e.target.value
                                )
                              }
                              placeholder="Ex: Universidade de São Paulo"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Data de Início
                            </label>
                            <input
                              type="date"
                              value={formatarDataInput(formacao.dtInicio)}
                              onChange={(e) =>
                                atualizarFormacao(
                                  index,
                                  "dtInicio",
                                  new Date(e.target.value).toISOString()
                                )
                              }
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Data de Conclusão
                            </label>
                            <input
                              type="date"
                              value={formatarDataInput(formacao.dtConclusao)}
                              onChange={(e) =>
                                atualizarFormacao(
                                  index,
                                  "dtConclusao",
                                  new Date(e.target.value).toISOString()
                                )
                              }
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {formacao.titulo}
                        </h4>
                        <p className="text-gray-700 mb-1">
                          {formacao.instituicao}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatarData(formacao.dtInicio)} -{" "}
                          {formatarData(formacao.dtConclusao)}
                        </p>
                      </div>
                    )}
                  </div>
                ))}

                {perfil.formacao.length === 0 && !editando && (
                  <p className="text-gray-500 text-center py-8">
                    Nenhuma formação acadêmica cadastrada
                  </p>
                )}
              </div>
            </div>

            {/* Experiência Profissional */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Experiência Profissional
                  </h3>
                </div>
                {editando && (
                  <button
                    onClick={adicionarExperiencia}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar Experiência</span>
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {perfil.experiencia.map((exp, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    {editando ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-md font-medium text-gray-900">
                            Experiência #{index + 1}
                          </h4>
                          <button
                            onClick={() => removerExperiencia(exp.id, index)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Título do Cargo
                            </label>
                            <input
                              type="text"
                              value={exp.titulo}
                              onChange={(e) =>
                                atualizarExperiencia(
                                  index,
                                  "titulo",
                                  e.target.value
                                )
                              }
                              placeholder="Ex: Professor de Matemática"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Instituição/Empresa
                            </label>
                            <input
                              type="text"
                              value={exp.instituicao}
                              onChange={(e) =>
                                atualizarExperiencia(
                                  index,
                                  "instituicao",
                                  e.target.value
                                )
                              }
                              placeholder="Ex: Colégio Objetivo"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Data de Início
                            </label>
                            <input
                              type="date"
                              value={formatarDataInput(exp.inicio)}
                              onChange={(e) =>
                                atualizarExperiencia(
                                  index,
                                  "inicio",
                                  new Date(e.target.value).toISOString()
                                )
                              }
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Data de Fim
                            </label>
                            <input
                              type="date"
                              value={formatarDataInput(exp.fim)}
                              onChange={(e) =>
                                atualizarExperiencia(
                                  index,
                                  "fim",
                                  new Date(e.target.value).toISOString()
                                )
                              }
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descrição das Atividades
                          </label>
                          <textarea
                            value={exp.descricao}
                            onChange={(e) =>
                              atualizarExperiencia(
                                index,
                                "descricao",
                                e.target.value
                              )
                            }
                            rows={3}
                            placeholder="Descreva suas principais atividades e responsabilidades..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {exp.titulo}
                        </h4>
                        <p className="text-gray-700 mb-1">{exp.instituicao}</p>
                        <p className="text-sm text-gray-600 mb-2">
                          {formatarData(exp.inicio)} - {formatarData(exp.fim)}
                        </p>
                        <p className="text-gray-700 text-sm">{exp.descricao}</p>
                      </div>
                    )}
                  </div>
                ))}

                {perfil.experiencia.length === 0 && !editando && (
                  <p className="text-gray-500 text-center py-8">
                    Nenhuma experiência profissional cadastrada
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Matérias
                </h3>
                {editando ? (
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Pesquisar matérias..."
                        value={filtroHabilidade}
                        onChange={(e) => setFiltroHabilidade(e.target.value)}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
                      {habilidadesFiltradas.length > 0 ? (
                        <div className="space-y-3">
                          {habilidadesFiltradas.map((hab) => (
                            <label
                              key={hab.id}
                              className="flex items-center space-x-3 p-2 hover:bg-white rounded-lg transition-colors cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={perfil.materias.includes(hab.nome)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setPerfil({
                                      ...perfil,
                                      materias: [...perfil.materias, hab.nome],
                                    });
                                  } else {
                                    setPerfil({
                                      ...perfil,
                                      materias: perfil.materias.filter(
                                        (m) => m !== hab.nome
                                      ),
                                    });
                                  }
                                }}
                                className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                              />
                              <span className="text-sm text-gray-700 font-medium">
                                {hab.nome}
                              </span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500 text-sm">
                            Nenhuma matéria encontrada para "{filtroHabilidade}"
                          </p>
                        </div>
                      )}
                    </div>
                    {filtroHabilidade && (
                      <p className="text-xs text-gray-500">
                        Mostrando {habilidadesFiltradas.length} de{" "}
                        {todasHabilidades.length} matérias
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      Selecione as matérias que você ensina
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {perfil.materias.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {perfil.materias.map((materia) => (
                          <span
                            key={materia}
                            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 border border-indigo-200"
                          >
                            {materia}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm italic">
                        Nenhuma matéria selecionada
                      </p>
                    )}
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




