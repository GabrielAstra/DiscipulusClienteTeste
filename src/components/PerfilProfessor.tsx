"use client";
import { useToast } from "@/context/ToastContext";
import { useUsuario } from "@/context/UsuarioContext";
import { ILoginRequest } from "@/lib/service/auth/auth.service";
import { professores } from "@/types/mock/professor-mock";
import {
  Calendar,
  CheckCircle,
  Clock,
  Globe,
  MessageCircle,
  Heart,
  GraduationCap,
  Briefcase,
  Award,
  MapPin,
  Star,
} from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import ModalAgendamento from "./ModalAgendamento";
import ModalChat from "./ModalChat";
import ModalLogin from "./ModalLogin";

interface FormacaoDTO {
  titulo: string;
  instituicao: string;
  dtInicio: string;
  dtConclusao: string;
}

interface ExperienciaDTO {
  titulo: string;
  instituicao: string;
  inicio: string;
  fim: string;
  descricao: string;
}

interface PropriedadesPerfilProfessor {
  id: string;
}

export default function PerfilProfessor({ id }: PropriedadesPerfilProfessor) {
  const { usuario, realizarLogin } = useUsuario();
  const { showError, showSuccess } = useToast();

  const professor = professores.find((p) => p.id === id);
  const [agendamentoAberto, setAgendamentoAberto] = useState(false);
  const [chatAberto, setChatAberto] = useState(false);
  const [modalLoginAberto, setModalLoginAberto] = useState(false);

  // Dados simulados para demonstração - em produção viriam da API
  const formacaoAcademica: FormacaoDTO[] = [
    {
      titulo: "Doutorado em Matemática Aplicada",
      instituicao: "Universidade de São Paulo (USP)",
      dtInicio: "2015-03-01T00:00:00.000Z",
      dtConclusao: "2019-12-15T00:00:00.000Z"
    },
    {
      titulo: "Mestrado em Física",
      instituicao: "Instituto de Física - USP",
      dtInicio: "2013-02-01T00:00:00.000Z",
      dtConclusao: "2015-01-30T00:00:00.000Z"
    }
  ];

  const experienciaProfissional: ExperienciaDTO[] = [
    {
      titulo: "Professora Senior de Matemática",
      instituicao: "Colégio Objetivo",
      inicio: "2020-01-15T00:00:00.000Z",
      fim: "2024-12-31T00:00:00.000Z",
      descricao: "Leciono matemática para ensino médio, desenvolvendo metodologias inovadoras e acompanhando alunos em vestibulares."
    },
    {
      titulo: "Tutora de Física",
      instituicao: "Centro de Estudos Avançados",
      inicio: "2018-03-01T00:00:00.000Z",
      fim: "2020-01-10T00:00:00.000Z",
      descricao: "Aulas particulares e em grupo, focando na preparação para concursos e vestibulares."
    }
  ];

  const certificacoes = [
    "Certificação em Ensino Online",
    "Especialização em Didática",
    "Metodologias Ativas de Aprendizagem"
  ];

  if (!professor) {
    redirect("/catalog");
  }

  const formatarData = (dataString: string) => {
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

  const lidarComCliqueBotaoAgendar = () => {
    if (usuario) {
      setAgendamentoAberto(true);
    } else {
      setModalLoginAberto(true);
    }
  };

  const lidarComCliqueBotaoChat = () => {
    if (usuario) {
      setChatAberto(true);
    } else {
      setModalLoginAberto(true);
    }
  };

  const lidarComSucessoLogin = async (dadosUsuario: ILoginRequest) => {
    const { success, data } = await realizarLogin(dadosUsuario);
    if (success) {
      showSuccess("Olá!", `Bem-vindo(a) de volta, ${data?.nome}!`);
    } else {
      showError("Email e/ou senha inválidos!");
    }
    setModalLoginAberto(false);
    setAgendamentoAberto(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative">
                <img
                  src={professor.avatar}
                  alt={professor.nome}
                  className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                />
                {professor.verificado && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {professor.nome}
                    </h1>
                    <div className="flex items-center justify-center md:justify-start space-x-1 text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>São Paulo, SP</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start space-x-4 text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-medium">
                          {professor.avaliacao}
                        </span>
                        <span>({professor.numeroAvaliacoes} avaliações)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-5 h-5" />
                        <span>{professor.experiencia} de experiência</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center md:text-right">
                    <div className="text-3xl font-bold text-gray-900">
                      R${professor.valorHora}
                    </div>
                    <div className="text-gray-600">por hora</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                  {professor.materias.map((materia) => (
                    <span
                      key={materia}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 border border-indigo-200"
                    >
                      {materia}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <button
                    onClick={lidarComCliqueBotaoAgendar}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Agendar Aula</span>
                  </button>
                  <button
                    onClick={lidarComCliqueBotaoChat}
                    className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
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
                {professor.biografia}
              </p>
            </div>

            {/* Academic Background */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <GraduationCap className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Formação Acadêmica
                </h2>
              </div>
              <div className="space-y-6">
                {formacaoAcademica.map((formacao, index) => (
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
                          {formatarData(formacao.dtInicio)} - {formatarData(formacao.dtConclusao)}
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

            {/* Professional Experience */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Briefcase className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Experiência Profissional
                </h2>
              </div>
              <div className="space-y-6">
                {experienciaProfissional.map((exp, index) => (
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
                          {formatarData(exp.inicio)} - {formatarData(exp.fim)}
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

            {/* Certifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Award className="w-6 h-6 text-amber-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Certificações e Especializações
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {certificacoes.map((certificacao, index) => (
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

            {/* Subject Areas */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Matérias e Especialidades
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {professor.materias.map((materia) => (
                  <div
                    key={materia}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    <span className="font-medium text-gray-900">{materia}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Avaliações ({professor.numeroAvaliacoes})
              </h2>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="font-medium text-gray-900">Sarah M.</span>
                    <span className="text-gray-500">2 semanas atrás</span>
                  </div>
                  <p className="text-gray-700">
                    Excelente professora! Realmente me ajudou a entender
                    conceitos complexos de cálculo. Paciente e explica as coisas
                    claramente.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="font-medium text-gray-900">Mike R.</span>
                    <span className="text-gray-500">1 mês atrás</span>
                  </div>
                  <p className="text-gray-700">
                    Ótimo estilo de ensino e muito conhecedor. Minhas notas
                    melhoraram significativamente após apenas algumas sessões.
                  </p>
                </div>
              </div>
            </div>
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
                      {professor.idiomas.join(", ")}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-600 font-medium">Experiência</div>
                    <div className="text-gray-900">{professor.experiencia}</div>
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
                    <div className="text-gray-900">São Paulo, SP</div>
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
                        professor.disponibilidade.includes(dia)
                          ? "text-green-700 bg-green-100"
                          : "text-gray-500 bg-gray-100"
                      }`}
                    >
                      {professor.disponibilidade.includes(dia)
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
              <button
                onClick={lidarComCliqueBotaoAgendar}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Primeira Aula</span>
              </button>
            </div>
          </div>
        </div>

        <ModalAgendamento
          professor={professor}
          aberto={agendamentoAberto}
          aoFechar={() => setAgendamentoAberto(false)}
        />

        <ModalChat
          professor={professor}
          aberto={chatAberto}
          aoFechar={() => setChatAberto(false)}
        />

        <ModalLogin
          aberto={modalLoginAberto}
          aoFechar={() => setModalLoginAberto(false)}
          aoFazerLogin={lidarComSucessoLogin}
        />
      </div>
    </div>
  );
}