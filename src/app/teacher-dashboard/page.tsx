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
  Globe,
  Camera,
  Upload,
  Eye,
  MapPin,
  Clock,
  CheckCircle,
  Award,
  Heart,
  MessageCircle,
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

const capitais = [
  "Rio Branco - AC",
  "Maceió - AL",
  "Macapá - AP",
  "Manaus - AM",
  "Salvador - BA",
  "Fortaleza - CE",
  "Brasília - DF",
  "Vitória - ES",
  "Goiânia - GO",
  "São Luís - MA",
  "Cuiabá - MT",
  "Campo Grande - MS",
  "Belo Horizonte - MG",
  "Belém - PA",
  "João Pessoa - PB",
  "Curitiba - PR",
  "Recife - PE",
  "Teresina - PI",
  "Rio de Janeiro - RJ",
  "Natal - RN",
  "Porto Alegre - RS",
  "Porto Velho - RO",
  "Boa Vista - RR",
  "Florianópolis - SC",
  "São Paulo - SP",
  "Aracaju - SE",
  "Palmas - TO"
];

const idiomasDisponiveis = [
  "Português",
  "Inglês",
  "Espanhol",
  "Francês",
  "Alemão",
  "Italiano",
  "Japonês",
  "Chinês (Mandarim)",
  "Russo",
  "Árabe",
  "Coreano",
  "Holandês",
  "Sueco",
  "Norueguês",
  "Dinamarquês",
  "Finlandês",
  "Polonês",
  "Tcheco",
  "Húngaro",
  "Grego",
  "Turco",
  "Hindi",
  "Hebraico",
  "Tailandês",
  "Vietnamita"
];

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
  const [mostrarModalPreview, setMostrarModalPreview] = useState(false);
  const [valorSaque, setValorSaque] = useState("");
  const [metodoSaque, setMetodoSaque] = useState("pix");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const { showError, showSuccess } = useToast();
  
  const [perfil, setPerfil] = useState<PerfilProfessor>({
    id: "1",
    nome: "",
    email: "",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    biografia:
      "",
    materias: [],
    valorHora: 45,
    experiencia: [],
    idiomas: [],
    disponibilidade: [],
    formacao: [],
    certificacoes: [
      "Certificação em Ensino Online",
      "Especialização em Didática",
    ],
    telefone: "",
    localizacao: "",
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
  const [filtroIdioma, setFiltroIdioma] = useState("");
  const [idiomasFiltrados, setIdiomasFiltrados] = useState<string[]>(idiomasDisponiveis);

  async function buscarInformacoesPessoais() {
    try {
      const res = await fetch(`/api/informacoesPessoais`, {
        method: "GET",
      });

      const body = (await res.json()) as IResponse<any>;

      if (!body.success) {
        showError(body.message ?? ERRO_REQUISICAO);
        return null;
      }

      const data = body.data;

      const idiomasArray = data.idiomas
        ? data.idiomas.split(",").map((i: string) => i.trim()).filter(Boolean)
        : [];

      const perfilFormatado: Partial<PerfilProfessor> = {
        nome: data.nome,
        email: data.email,
        avatar: data.urlFoto,
        biografia: data.biografia,
        valorHora: data.horaAula,
        telefone: data.celular || "",
        localizacao: data.localizacao || "",
        idiomas: idiomasArray,
      };

      return perfilFormatado;
    } catch (err) {
      console.error("Erro ao buscar informações pessoais:", err);
      showError("Erro ao buscar informações pessoais.");
      return null;
    }
  }

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

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showError('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showError('A imagem deve ter no máximo 5MB.');
      return;
    }

    setUploadingPhoto(true);

    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      
      // Here you would normally upload to your server/cloud storage
      // For now, we'll just use the preview URL
      setPerfil(prevPerfil => ({
        ...prevPerfil,
        avatar: previewUrl
      }));

      showSuccess('Foto atualizada com sucesso!');
    } catch (error) {
      console.error('Error uploading photo:', error);
      showError('Erro ao fazer upload da foto.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  useEffect(() => {
    async function carregarInformacoesPessoais() {
      const info = await buscarInformacoesPessoais();
      if (info) {
        setPerfil((prev) => ({
          ...prev,
          ...info,
        }));
      }
    }

    carregarInformacoesPessoais();
  }, []);

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

  useEffect(() => {
    const filtered = idiomasDisponiveis.filter((idioma) =>
      idioma.toLowerCase().includes(filtroIdioma.toLowerCase())
    );
    setIdiomasFiltrados(filtered);
  }, [filtroIdioma]);

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

  const formatarDataPreview = (dataString: string) => {
    return new Date(dataString).toLocaleDateString("pt-BR", {
      month: 'short',
      year: 'numeric'
    });
  };

  const calcularDuracao = (inicio: string, fim: string) => {
    const dataInicio = new Date(inicio);
    const dataFim = new Date(fim);
    const diffAnos = dataFim.getFullYear() - dataInicio.getFullYear();
    const diffMeses = dataFim.getMonth() - dataInicio.getMonth();
    
    const totalMeses = diffAnos * 12 + diffMeses;
    const anos = Math.floor(totalMeses / 12);
    const meses = totalMeses % 12;
    
    if (anos > 0 && meses > 0) {
      return `${anos} ano${anos > 1 ? 's' : ''} e ${meses} ${meses > 1 ? 'meses' : 'mês'}`;
    } else if (anos > 0) {
      return `${anos} ano${anos > 1 ? 's' : ''}`;
    } else {
      return `${meses} ${meses > 1 ? 'meses' : 'mês'}`;
    }
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
                <div className="flex space-x-2">
                  <button
                    onClick={() => setMostrarModalPreview(true)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Visualizar Perfil</span>
                  </button>
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
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {/* Profile Photo Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Foto de Perfil
                    </label>
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <img
                          src={perfil.avatar}
                          alt={perfil.nome}
                          className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                        />
                        {editando && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                            <Camera className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </div>
                      
                      {editando && (
                        <div className="flex-1">
                          <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer ${
                              dragOver 
                                ? 'border-indigo-500 bg-indigo-50' 
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(file);
                              }}
                              className="hidden"
                              id="photo-upload"
                            />
                            <label
                              htmlFor="photo-upload"
                              className="cursor-pointer flex flex-col items-center space-y-2"
                            >
                              {uploadingPhoto ? (
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                              ) : (
                                <>
                                  <Upload className="w-8 h-8 text-gray-400" />
                                  <div className="text-sm text-gray-600">
                                    <span className="font-medium text-indigo-600">Clique para fazer upload</span>
                                    <span> ou arraste a imagem aqui</span>
                                  </div>
                                  <p className="text-xs text-gray-500">PNG, JPG até 5MB</p>
                                </>
                              )}
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

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
                    <select
                      value={perfil.localizacao}
                      onChange={(e) =>
                        setPerfil({ ...perfil, localizacao: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Selecione uma capital</option>
                      {capitais.map((cidade) => (
                        <option key={cidade} value={cidade}>
                          {cidade}
                        </option>
                      ))}
                    </select>
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
                      <div className="space-y-3">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Pesquisar idiomas..."
                            value={filtroIdioma}
                            onChange={(e) => setFiltroIdioma(e.target.value)}
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Globe className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                        <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
                          {idiomasFiltrados.length > 0 ? (
                            <div className="space-y-3">
                              {idiomasFiltrados.map((idioma) => (
                                <label
                                  key={idioma}
                                  className="flex items-center space-x-3 p-2 hover:bg-white rounded-lg transition-colors cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={perfil.idiomas.includes(idioma)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setPerfil({
                                          ...perfil,
                                          idiomas: [...perfil.idiomas, idioma],
                                        });
                                      } else {
                                        setPerfil({
                                          ...perfil,
                                          idiomas: perfil.idiomas.filter(
                                            (i) => i !== idioma
                                          ),
                                        });
                                      }
                                    }}
                                    className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                                  />
                                  <span className="text-sm text-gray-700 font-medium">
                                    {idioma}
                                  </span>
                                </label>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-4">
                              <p className="text-gray-500 text-sm">
                                Nenhum idioma encontrado para "{filtroIdioma}"
                              </p>
                            </div>
                          )}
                        </div>
                        {filtroIdioma && (
                          <p className="text-xs text-gray-500">
                            Mostrando {idiomasFiltrados.length} de{" "}
                            {idiomasDisponiveis.length} idiomas
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          Selecione os idiomas que você domina
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {perfil.idiomas.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {perfil.idiomas.map((idioma) => (
                              <span
                                key={idioma}
                                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200"
                              >
                                <Globe className="w-3 h-3 mr-1" />
                                {idioma}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm italic">
                            Nenhum idioma selecionado
                          </p>
                        )}
                      </div>
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

        {/* Modal de Saque */}
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

        {/* Modal de Preview do Perfil */}
        {mostrarModalPreview && (
          <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white  z-1 border-b border-gray-200 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Visualização do Perfil
                  </h3>
                  <button
                    onClick={() => setMostrarModalPreview(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-600 mt-1">Como os alunos veem seu perfil</p>
              </div>
              
              <div className="p-6">
                {/* Header Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="relative">
                        <img
                          src={perfil.avatar}
                          alt={perfil.nome}
                          className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                          <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                              {perfil.nome || "Nome do Professor"}
                            </h1>
                            <div className="flex items-center justify-center md:justify-start space-x-1 text-gray-600 mb-2">
                              <MapPin className="w-4 h-4" />
                              <span>{perfil.localizacao || "São Paulo, SP"}</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start space-x-4 text-gray-600 mb-4">
                              <div className="flex items-center space-x-1">
                                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                <span className="font-medium">4.9</span>
                                <span>(124 avaliações)</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-5 h-5" />
                                <span>5+ anos de experiência</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-center md:text-right">
                            <div className="text-3xl font-bold text-gray-900">
                              R${perfil.valorHora}
                            </div>
                            <div className="text-gray-600">por hora</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                          {perfil.materias.length > 0 ? perfil.materias.map((materia) => (
                            <span
                              key={materia}
                              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 border border-indigo-200"
                            >
                              {materia}
                            </span>
                          )) : (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600 border border-gray-200">
                              Adicione suas matérias
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 shadow-sm">
                            <Calendar className="w-5 h-5" />
                            <span>Agendar Aula</span>
                          </button>
                          <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                            <MessageCircle className="w-5 h-5" />
                            <span>Enviar Mensagem</span>
                          </button>
                          <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-3 rounded-lg transition-colors">
                            <Heart className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* About Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Sobre
                      </h2>
                      <p className="text-gray-700 leading-relaxed">
                        {perfil.biografia || "Adicione uma biografia para se apresentar aos alunos."}
                      </p>
                    </div>

                    {/* Academic Background */}
                    {perfil.formacao.length > 0 && (
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center space-x-2 mb-6">
                          <GraduationCap className="w-6 h-6 text-indigo-600" />
                          <h2 className="text-xl font-semibold text-gray-900">
                            Formação Acadêmica
                          </h2>
                        </div>
                        <div className="space-y-6">
                          {perfil.formacao.map((formacao, index) => (
                            <div key={index} className="relative pl-6 border-l-2 border-indigo-100 last:border-l-0">
                              <div className="absolute -left-2 top-2 w-4 h-4 bg-indigo-600 rounded-full"></div>
                              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-100">
                                <h3 className="font-semibold text-gray-900 mb-1">
                                  {formacao.titulo}
                                </h3>
                                <p className="text-indigo-700 font-medium mb-2">
                                  {formacao.instituicao}
                                </p>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <Calendar className="w-4 h-4" />
                                  <span>
                                    {formatarDataPreview(formacao.dtInicio)} - {formatarDataPreview(formacao.dtConclusao)}
                                  </span>
                                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                                    {calcularDuracao(formacao.dtInicio, formacao.dtConclusao)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Professional Experience */}
                    {perfil.experiencia.length > 0 && (
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center space-x-2 mb-6">
                          <Briefcase className="w-6 h-6 text-green-600" />
                          <h2 className="text-xl font-semibold text-gray-900">
                            Experiência Profissional
                          </h2>
                        </div>
                        <div className="space-y-6">
                          {perfil.experiencia.map((exp, index) => (
                            <div key={index} className="relative pl-6 border-l-2 border-green-100 last:border-l-0">
                              <div className="absolute -left-2 top-2 w-4 h-4 bg-green-600 rounded-full"></div>
                              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                                <h3 className="font-semibold text-gray-900 mb-1">
                                  {exp.titulo}
                                </h3>
                                <p className="text-green-700 font-medium mb-2">
                                  {exp.instituicao}
                                </p>
                                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                                  <Calendar className="w-4 h-4" />
                                  <span>
                                    {formatarDataPreview(exp.inicio)} - {formatarDataPreview(exp.fim)}
                                  </span>
                                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                    {calcularDuracao(exp.inicio, exp.fim)}
                                  </span>
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                  {exp.descricao}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Certifications */}
                    {perfil.certificacoes.length > 0 && (
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center space-x-2 mb-6">
                          <Award className="w-6 h-6 text-amber-600" />
                          <h2 className="text-xl font-semibold text-gray-900">
                            Certificações e Especializações
                          </h2>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {perfil.certificacoes.map((certificacao, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-100 hover:shadow-sm transition-shadow"
                            >
                              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                                <Award className="w-4 h-4 text-amber-600" />
                              </div>
                              <span className="font-medium text-gray-900 text-sm">
                                {certificacao}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Informações Rápidas
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-600 font-medium">Idiomas</div>
                            <div className="text-gray-900">
                              {perfil.idiomas.length > 0 ? perfil.idiomas.join(", ") : "Adicione seus idiomas"}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-600 font-medium">Experiência</div>
                            <div className="text-gray-900">5+ anos</div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-600 font-medium">Status</div>
                            <div className="text-green-600 font-medium">
                              Professor Verificado
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-600 font-medium">Localização</div>
                            <div className="text-gray-900">{perfil.localizacao || "Adicione sua localização"}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Disponibilidade
                      </h3>
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
                          <div key={dia} className="flex items-center justify-between">
                            <span className="text-gray-700">{dia}</span>
                            <span
                              className={`text-sm font-medium px-2 py-1 rounded-full ${
                                perfil.disponibilidade.includes(dia)
                                  ? "text-green-700 bg-green-100"
                                  : "text-gray-500 bg-gray-100"
                              }`}
                            >
                              {perfil.disponibilidade.includes(dia)
                                ? "Disponível"
                                : "Indisponível"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact Card */}
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Pronto para começar?
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Agende sua primeira aula e experimente um ensino personalizado
                        de alta qualidade.
                      </p>
                      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Agendar Primeira Aula</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}