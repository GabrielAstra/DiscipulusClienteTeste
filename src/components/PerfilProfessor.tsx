"use client";
import { useToast } from "@/context/ToastContext";
import { useUsuario } from "@/context/UsuarioContext";
import { ILoginRequest } from "@/lib/service/auth/auth.service";
import { useRouter } from "next/navigation";
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
import { useEffect, useState } from "react";
import ModalAgendamento from "./ModalAgendamento";
import ModalChat from "./ModalChat";
import ModalLogin from "./ModalLogin";
import { Professor } from "@/types/professor";

import { listarProfessor } from "@/lib/service/teacher/teacher.service";



interface PropriedadesPerfilProfessor {
  id: string;
}

export default function PerfilProfessor({ id }: PropriedadesPerfilProfessor) {
  const { usuario, realizarLogin } = useUsuario();
  const { showError, showSuccess } = useToast();

  const [professor, setProfessor] = useState<Professor | null>(null);
  const [loading, setLoading] = useState(true);
  const [agendamentoAberto, setAgendamentoAberto] = useState(false);
  const [chatAberto, setChatAberto] = useState(false);
  const [modalLoginAberto, setModalLoginAberto] = useState(false);
  const router = useRouter();


  useEffect(() => {
    async function carregarPerfil() {
      try {
        const data = await listarProfessor(id);
        setProfessor(data);
      } catch (err) {
        console.error("Erro ao carregar perfil do professor", err);
        setProfessor(null);
        showError("Professor não encontrado. Redirecionando para o catálogo...");
      } finally {
        setLoading(false);
      }
    }

    carregarPerfil();
  }, [id, showError]);

  useEffect(() => {
    if (!loading && !professor) {
      router.push("/catalog");
    }
  }, [loading, professor, router]);


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
  const renderStars = (nota: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < nota ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
      />
    ));
  };

  if (loading || !professor) {
    return null;
  }
  const diasDisponiveis = professor.disponibilidade?.$values ?? [];
  
  const diasComHorarios = new Set(
    diasDisponiveis.map(d => d.diaSemana)
  );
  
  const mapaDias: { [key: number]: string } = {
    0: "Domingo",
    1: "Segunda",
    2: "Terça",
    3: "Quarta",
    4: "Quinta",
    5: "Sexta",
    6: "Sábado"
  };
  
  const disponibilidade = Array.from(diasComHorarios).map(dia => mapaDias[dia]);
  const avaliacoes = professor.avaliacao?.$values ?? [];

  const totalAvaliacoes = avaliacoes.length;

  const mediaAvaliacoes =
    totalAvaliacoes > 0
      ? (
        avaliacoes.reduce((acc, av) => acc + av.nota, 0) /
        totalAvaliacoes
      ).toFixed(1)
      : "0";



  return (
    <div className="min-h-screen bg-transparent relative">
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/backgroundProfile.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       
        <div className="bg-white rounded-xl shadow-sm border-2 border-[#6562ff] overflow-hidden mb-8">
          <div className="h-1 w-full bg-gradient-to-r from-[#6562ff] via-[#6562ff]/60 to-transparent" />
          
          <div className="flex flex-col sm:flex-row gap-0">
            <div className="relative flex-shrink-0 p-5 pb-0 sm:pb-5">
              <div className="relative mx-auto w-32 h-32 sm:w-36 sm:h-36">
                <img
                  src={professor.urlFoto || "/avatar.png"}
                  alt={professor.nome}
                  className="h-full w-full rounded-2xl object-cover shadow-md transition-transform duration-500 hover:scale-[1.03]"
                  onError={(e) => {
                    e.currentTarget.src = "/avatar.png";
                  }}
                />

                <div className="absolute -bottom-1 -right-1 flex items-center justify-center h-7 w-7 rounded-full bg-white border-2 border-white">
                  <span className="h-4 w-4 rounded-full bg-green-500 animate-pulse" />
                </div>

                <div className="absolute -top-2 -right-2 flex items-center justify-center h-7 w-7 rounded-full bg-[#6562ff] text-white shadow-md">
                  <CheckCircle className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="flex-1 p-5 pt-3 sm:pt-5 sm:pl-1 flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                    {professor.nome}
                  </h1>
                  {professor.localizacao && (
                    <p className="mt-0.5 flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="h-3.5 w-3.5" />
                      {professor.localizacao}
                    </p>
                  )}
                  <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3.5 w-3.5 ${
                              star <= Math.floor(parseFloat(mediaAvaliacoes))
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-gray-900 ml-0.5">
                        {mediaAvaliacoes}
                      </span>
                      <span className="text-xs">({totalAvaliacoes} avaliações)</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {professor.tempoExperiencia} anos de experiência
                    </span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    R${professor.horaAula}
                  </p>
                  <p className="text-xs text-gray-600">por aula</p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {professor.detalhesHabilidades?.$values.slice(0, 4).map((habilidade) => (
                  <span
                    key={habilidade.habilidadeID}
                    className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800 border border-indigo-200"
                  >
                    {habilidade.nomeHabilidade}
                  </span>
                ))}
                {professor.idioma && (
                  <span className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700">
                    <Globe className="h-3 w-3 inline mr-1" />
                    {professor.idioma}
                  </span>
                )}
               
              </div>

              <div className="mt-auto pt-4 flex flex-wrap items-center gap-2">
                <button
                  onClick={lidarComCliqueBotaoAgendar}
                  className="flex items-center gap-2 rounded-xl bg-[#6562ff] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#6562ff]/20 transition-all hover:bg-[#5451dd] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Calendar className="h-4 w-4" />
                  Agendar Aula
                </button>
                <button
                  onClick={lidarComCliqueBotaoChat}
                  className="flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Enviar Mensagem
                </button>
                <button className="ml-auto flex items-center justify-center h-10 w-10 rounded-xl border border-gray-300 text-gray-600 transition-all hover:bg-gray-50 hover:text-red-500 hover:scale-110 active:scale-90">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
      
          <div className="lg:col-span-2 space-y-8">
  
            <div className="bg-white rounded-xl shadow-sm border-2 border-[#6562ff] p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Sobre
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {professor.biografia}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border-2 border-[#6562ff] p-6">
              <div className="flex items-center space-x-2 mb-6">
                <GraduationCap className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Formação Acadêmica
                </h2>
              </div>
              <div className="space-y-6">
                {professor.formacoes?.$values.map((formacao, index) => (
                  <div
                    key={formacao.id ?? index}
                    className="relative pl-6 border-l-2 border-indigo-100 last:border-l-0"
                  >
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
                          {formatarData(formacao.dtInicio)} -{" "}
                          {formatarData(formacao.dtConclusao)}
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

            <div className="bg-white rounded-xl shadow-sm border-2 border-[#6562ff] p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Briefcase className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Experiência Profissional
                </h2>
              </div>
              <div className="space-y-6">
                {professor.experiencias?.$values.map((exp, index) => (
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

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Matérias e Especialidades
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {professor.detalhesHabilidades?.$values.map((habilidade) => (
                  <div
                    key={habilidade.habilidadeID}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    <span className="font-medium text-gray-900">
                      {habilidade.nomeHabilidade}
                    </span>
                  </div>
                ))}
              </div>

            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Avaliações ({totalAvaliacoes})
              </h2>

              <div className="space-y-4">
                {avaliacoes.length === 0 && (
                  <p className="text-gray-500 text-sm">
                    Este professor ainda não possui avaliações.
                  </p>
                )}

                {avaliacoes.map((avaliacao) => (
                  <div
                    key={avaliacao.avaliacaoId}
                    className="border-b border-gray-200 pb-4"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {renderStars(avaliacao.nota)}
                      </div>

                      {/* Se futuramente vier nome do aluno */}
                      <span className="font-medium text-gray-900">
                        Aluno anônimo
                      </span>
                    </div>

                    <p className="text-gray-700">
                      {avaliacao.comentario}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border-2 border-[#6562ff] p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Informações Rápidas
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-600 font-medium">Idiomas</div>
                    <div className="text-gray-900">
                      {professor.idioma}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-600 font-medium">Experiência</div>
                    <div className="text-gray-900">{professor.tempoExperiencia} anos</div>
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
                    <div className="text-gray-900">{professor.localizacao || "Localização não informada"}</div>
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
                ].map((dia) => {
                  const diaDisponivel = disponibilidade.includes(dia);
                  return (
                    <div key={dia} className="flex items-center justify-between">
                      <span className="text-gray-700">{dia}</span>
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded-full ${diaDisponivel
                            ? "text-green-700 bg-green-100"
                            : "text-gray-500 bg-gray-100"
                          }`}
                      >
                        {diaDisponivel
                          ? "Disponível"
                          : "Indisponível"}
                      </span>
                    </div>
                  );
                })}

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
          aoIrParaPagamento={(dados) => {
          }}
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