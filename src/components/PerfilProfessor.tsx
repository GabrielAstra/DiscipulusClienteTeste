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
  MapPin,
  Star,
  BookOpen,
  ChevronRight,
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
  const [favoritado, setFavoritado] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const data = await listarProfessor(id);
        setProfessor(data);
      } catch {
        setProfessor(null);
        showError("Professor não encontrado. Redirecionando para o catálogo...");
      } finally {
        setLoading(false);
      }
    }
    carregarPerfil();
  }, [id, showError]);

  useEffect(() => {
    if (!loading && !professor) router.push("/catalog");
  }, [loading, professor, router]);

  const formatarData = (dataString: string) =>
    new Date(dataString).toLocaleDateString("pt-BR", { month: "short", year: "numeric" });

  const calcularDuracao = (inicio: string, fim: string) => {
    const totalMeses =
      (new Date(fim).getFullYear() - new Date(inicio).getFullYear()) * 12 +
      (new Date(fim).getMonth() - new Date(inicio).getMonth());
    const anos = Math.floor(totalMeses / 12);
    const meses = totalMeses % 12;
    if (anos > 0 && meses > 0) return `${anos}a ${meses}m`;
    if (anos > 0) return `${anos} ano${anos > 1 ? "s" : ""}`;
    return `${meses} ${meses > 1 ? "meses" : "mês"}`;
  };

  const lidarComCliqueBotaoAgendar = () => {
    if (usuario) setAgendamentoAberto(true);
    else setModalLoginAberto(true);
  };

  const lidarComCliqueBotaoChat = () => {
    if (usuario) setChatAberto(true);
    else setModalLoginAberto(true);
  };

  const lidarComSucessoLogin = async (dadosUsuario: ILoginRequest) => {
    const { success, data } = await realizarLogin(dadosUsuario);
    if (success) showSuccess("Olá!", `Bem-vindo(a) de volta, ${data?.nome}!`);
    else showError("Email e/ou senha inválidos!");
    setModalLoginAberto(false);
    setAgendamentoAberto(true);
  };

  if (loading || !professor) return null;

  const avaliacoes = professor.avaliacao?.$values ?? [];
  const totalAvaliacoes = avaliacoes.length;
  const mediaAvaliacoes =
    totalAvaliacoes > 0
      ? (avaliacoes.reduce((acc, av) => acc + av.nota, 0) / totalAvaliacoes).toFixed(1)
      : "0";

  const diasDisponiveis = professor.disponibilidade?.$values ?? [];
  const diasComHorarios = new Set(diasDisponiveis.map((d) => d.diaSemana));
  const mapaDias: Record<number, string> = {
    0: "Domingo", 1: "Segunda", 2: "Terça", 3: "Quarta",
    4: "Quinta", 5: "Sexta", 6: "Sábado",
  };
  const disponibilidade = Array.from(diasComHorarios).map((d) => mapaDias[d]);

  const habilidades = professor.detalhesHabilidades?.$values ?? [];

  return (
    <div className="min-h-screen bg-[#f4f5f7]">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-16 relative">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          <div className="flex-1 min-w-0 space-y-5">

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="relative flex-shrink-0">
                  <img
                    src={professor.urlFoto || "/avatar.png"}
                    alt={professor.nome}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-lg ring-4 ring-white"
                    onError={(e) => { e.currentTarget.src = "/avatar.png"; }}
                  />
                  <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md">
                    <span className="h-3.5 w-3.5 rounded-full bg-green-500" />
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-2xl font-bold text-gray-900">{professor.nome}</h1>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#6562ff]/10 px-2.5 py-0.5 text-xs font-semibold text-[#6562ff]">
                          <CheckCircle className="h-3 w-3" />
                          Verificado
                        </span>
                      </div>
                      {professor.localizacao && (
                        <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="h-3.5 w-3.5" />
                          {professor.localizacao}
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">R$ {professor.horaAula}</p>
                      <p className="text-xs text-gray-400">por aula</p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {[1,2,3,4,5].map((s) => (
                          <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.floor(parseFloat(mediaAvaliacoes)) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-gray-900">{mediaAvaliacoes}</span>
                      <span className="text-xs text-gray-400">({totalAvaliacoes})</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Clock className="h-3.5 w-3.5" />
                      {professor.tempoExperiencia} anos de exp.
                    </div>
                    {professor.idioma && (
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Globe className="h-3.5 w-3.5" />
                        {professor.idioma}
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {habilidades.slice(0, 5).map((h) => (
                      <span key={h.habilidadeID} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                        {h.nomeHabilidade}
                      </span>
                    ))}
                    {habilidades.length > 5 && (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                        +{habilidades.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Ações */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={lidarComCliqueBotaoAgendar}
                      className="flex items-center gap-2 rounded-xl bg-[#6562ff] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#6562ff]/25 transition-all hover:bg-[#5451dd] hover:shadow-lg active:scale-95"
                    >
                      <Calendar className="h-4 w-4" />
                      Agendar Aula
                    </button>
                    <button
                      onClick={lidarComCliqueBotaoChat}
                      className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Mensagem
                    </button>
                    <button
                      onClick={() => setFavoritado(!favoritado)}
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all active:scale-90 ${favoritado ? "border-red-200 bg-red-50 text-red-500" : "border-gray-200 bg-white text-gray-400 hover:text-red-400"}`}
                    >
                      <Heart className={`h-4 w-4 ${favoritado ? "fill-current" : ""}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sobre */}
            {professor.biografia && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-base font-bold text-gray-900 mb-3">Sobre</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{professor.biografia}</p>
              </div>
            )}

            {/* Matérias */}
            {habilidades.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-4 w-4 text-[#6562ff]" />
                  <h2 className="text-base font-bold text-gray-900">Matérias</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {habilidades.map((h) => (
                    <span key={h.habilidadeID} className="flex items-center gap-1.5 rounded-xl bg-[#6562ff]/8 px-3.5 py-2 text-sm font-medium text-[#6562ff]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#6562ff]" />
                      {h.nomeHabilidade}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Formação */}
            {(professor.formacoes?.$values?.length ?? 0) > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-5">
                  <GraduationCap className="h-4 w-4 text-violet-600" />
                  <h2 className="text-base font-bold text-gray-900">Formação Acadêmica</h2>
                </div>
                <div className="space-y-4">
                  {professor.formacoes!.$values.map((f, i) => (
                    <div key={f.id ?? i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="h-4 w-4 text-violet-600" />
                        </div>
                        {i < professor.formacoes!.$values.length - 1 && (
                          <div className="w-px flex-1 bg-gray-100 mt-2" />
                        )}
                      </div>
                      <div className="pb-4 flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{f.titulo}</p>
                        <p className="text-sm text-violet-600 font-medium mt-0.5">{f.instituicao}</p>
                        <div className="mt-1.5 flex items-center gap-2">
                          <span className="text-xs text-gray-400">{formatarData(f.dtInicio)} – {formatarData(f.dtConclusao)}</span>
                          <span className="rounded-full bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-600">
                            {calcularDuracao(f.dtInicio, f.dtConclusao)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experiência */}
            {(professor.experiencias?.$values?.length ?? 0) > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Briefcase className="h-4 w-4 text-emerald-600" />
                  <h2 className="text-base font-bold text-gray-900">Experiência Profissional</h2>
                </div>
                <div className="space-y-4">
                  {professor.experiencias!.$values.map((exp, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="h-4 w-4 text-emerald-600" />
                        </div>
                        {i < professor.experiencias!.$values.length - 1 && (
                          <div className="w-px flex-1 bg-gray-100 mt-2" />
                        )}
                      </div>
                      <div className="pb-4 flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{exp.titulo}</p>
                        <p className="text-sm text-emerald-600 font-medium mt-0.5">{exp.instituicao}</p>
                        <div className="mt-1.5 flex items-center gap-2">
                          <span className="text-xs text-gray-400">{formatarData(exp.inicio)} – {formatarData(exp.fim)}</span>
                          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">
                            {calcularDuracao(exp.inicio, exp.fim)}
                          </span>
                        </div>
                        {exp.descricao && (
                          <p className="mt-2 text-xs text-gray-500 leading-relaxed">{exp.descricao}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Avaliações */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-gray-900">Avaliações</h2>
                {totalAvaliacoes > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} className={`h-4 w-4 ${s <= Math.floor(parseFloat(mediaAvaliacoes)) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-900">{mediaAvaliacoes}</span>
                    <span className="text-xs text-gray-400">({totalAvaliacoes})</span>
                  </div>
                )}
              </div>

              {avaliacoes.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">Nenhuma avaliação ainda.</p>
              ) : (
                <div className="space-y-4">
                  {avaliacoes.map((av) => (
                    <div key={av.avaliacaoId} className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-500">
                        A
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-800">Aluno anônimo</span>
                          <div className="flex">
                            {[1,2,3,4,5].map((s) => (
                              <Star key={s} className={`h-3 w-3 ${s <= av.nota ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{av.comentario}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0 space-y-4 lg:sticky lg:top-6">

            {/* Card de agendamento */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-[#6562ff] p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider opacity-75 mb-1">Valor por aula</p>
                <p className="text-3xl font-bold">R$ {professor.horaAula}</p>
                <p className="text-xs opacity-60 mt-0.5">Pagamento seguro</p>
              </div>
              <div className="p-5 space-y-3">
                <button
                  onClick={lidarComCliqueBotaoAgendar}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#6562ff] py-3 text-sm font-semibold text-white shadow-md shadow-[#6562ff]/25 transition-all hover:bg-[#5451dd] hover:shadow-lg active:scale-95"
                >
                  <Calendar className="h-4 w-4" />
                  Agendar Aula
                </button>
                <button
                  onClick={lidarComCliqueBotaoChat}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
                >
                  <MessageCircle className="h-4 w-4" />
                  Enviar Mensagem
                </button>
              </div>
            </div>

            {/* Info rápida */}
            <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Informações</h3>
              {[
                { icon: Clock, label: "Experiência", value: `${professor.tempoExperiencia} anos` },
                { icon: Globe, label: "Idioma", value: professor.idioma },
                { icon: MapPin, label: "Localização", value: professor.localizacao || "Não informada" },
                { icon: CheckCircle, label: "Status", value: "Verificado", color: "text-green-600" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Icon className="h-3.5 w-3.5" />
                    <span className="text-xs">{label}</span>
                  </div>
                  <span className={`text-xs font-semibold ${color ?? "text-gray-800"}`}>{value}</span>
                </div>
              ))}
            </div>

            {/* Disponibilidade */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Disponibilidade</h3>
              <div className="grid grid-cols-7 gap-1">
                {["D","S","T","Q","Q","S","S"].map((letra, i) => {
                  const nomeDia = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"][i];
                  const ativo = disponibilidade.includes(nomeDia);
                  return (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <span className="text-[10px] text-gray-400 font-medium">{letra}</span>
                      <div className={`h-7 w-7 rounded-lg flex items-center justify-center text-[10px] font-bold transition-colors ${ativo ? "bg-[#6562ff] text-white" : "bg-gray-100 text-gray-300"}`}>
                        {ativo ? "✓" : "–"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA bottom */}
            <button
              onClick={lidarComCliqueBotaoAgendar}
              className="w-full flex items-center justify-between rounded-2xl bg-gray-900 px-5 py-4 text-white transition-all hover:bg-gray-800 active:scale-95"
            >
              <div className="text-left">
                <p className="text-xs text-gray-400">Pronto para começar?</p>
                <p className="text-sm font-semibold">Agende sua primeira aula</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      <ModalAgendamento
        professor={professor}
        aberto={agendamentoAberto}
        aoFechar={() => setAgendamentoAberto(false)}
        aoIrParaPagamento={() => {}}
      />
      <ModalChat professor={professor} aberto={chatAberto} aoFechar={() => setChatAberto(false)} />
      <ModalLogin aberto={modalLoginAberto} aoFechar={() => setModalLoginAberto(false)} aoFazerLogin={lidarComSucessoLogin} />
    </div>
  );
}
