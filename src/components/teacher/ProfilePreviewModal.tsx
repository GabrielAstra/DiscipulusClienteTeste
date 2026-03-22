"use client";

import { PerfilProfessor, Habilidade } from '@/types/teacher';
import { formatarDataPreview, calcularDuracao } from '@/utils/formatters';
import { diasSemana } from '@/constants/teacher';
import {
  X, MapPin, Star, Clock, CheckCircle, Calendar, MessageCircle, Heart,
  Globe, GraduationCap, Briefcase, BookOpen, ChevronRight,
} from 'lucide-react';

interface ProfilePreviewModalProps {
  mostrarModal: boolean;
  onClose: () => void;
  perfil: PerfilProfessor;
  todasHabilidades?: Habilidade[];
}

const DIAS_ABREV = ["D","S","T","Q","Q","S","S"];

export function ProfilePreviewModal({
  mostrarModal,
  onClose,
  perfil,
  todasHabilidades = [],
}: ProfilePreviewModalProps) {
  if (!mostrarModal) return null;

  const habilidadesResolvidas = perfil.habilidades.map((hId) => {
    const hab = todasHabilidades.find((h) => h.id.toString() === hId);
    return hab?.nome ?? hId;
  });

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#f4f5f7] rounded-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">

        {/* Barra superior do modal */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-white border-b border-gray-100 flex-shrink-0 rounded-t-2xl">
          <div>
            <p className="text-sm font-bold text-gray-900">Visualização do Perfil</p>
            <p className="text-xs text-gray-400">Como os alunos veem seu perfil</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Conteúdo scrollável */}
        <div className="overflow-y-auto flex-1">

          {/* Hero cover */}
          <div className="relative h-36  overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 opacity-20" />
            <div className="absolute bottom-0 left-0 right-0 h-16 " />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-12 pb-10">
            <div className="flex flex-col lg:flex-row gap-5 items-start">

              {/* Coluna principal */}
              <div className="flex-1 min-w-0 space-y-4">

                {/* Card identidade */}
                <div className="bg-white rounded-2xl shadow-sm p-5">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={perfil.avatar || "/avatar.png"}
                        alt={perfil.nome}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-lg ring-4 ring-white"
                        onError={(e) => { e.currentTarget.src = "/avatar.png"; }}
                      />
                      <span className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md">
                        <span className="h-3 w-3 rounded-full bg-green-500" />
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="text-xl font-bold text-gray-900">{perfil.nome || "Nome do Professor"}</h1>
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#6562ff]/10 px-2.5 py-0.5 text-xs font-semibold text-[#6562ff]">
                              <CheckCircle className="h-3 w-3" />
                              Verificado
                            </span>
                          </div>
                          {perfil.localizacao && (
                            <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                              <MapPin className="h-3 w-3" />
                              {perfil.localizacao}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">R$ {perfil.valorHora}</p>
                          <p className="text-xs text-gray-400">por aula</p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="mt-2 flex flex-wrap gap-3">
                        <div className="flex items-center gap-1.5">
                          <div className="flex">
                            {[1,2,3,4,5].map((s) => (
                              <Star key={s} className={`h-3 w-3 ${s <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-gray-900">4.9</span>
                          <span className="text-xs text-gray-400">(prévia)</span>
                        </div>
                        {perfil.idiomas.length > 0 && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Globe className="h-3 w-3" />
                            {perfil.idiomas.join(", ")}
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {habilidadesResolvidas.length > 0 ? (
                          habilidadesResolvidas.slice(0, 5).map((nome, i) => (
                            <span key={i} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                              {nome}
                            </span>
                          ))
                        ) : (
                          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-400">
                            Adicione suas matérias
                          </span>
                        )}
                        {habilidadesResolvidas.length > 5 && (
                          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
                            +{habilidadesResolvidas.length - 5}
                          </span>
                        )}
                      </div>

                      {/* Botões (desabilitados no preview) */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button disabled className="flex items-center gap-2 rounded-xl bg-[#6562ff]/50 px-4 py-2 text-xs font-semibold text-white cursor-not-allowed">
                          <Calendar className="h-3.5 w-3.5" />
                          Agendar Aula
                        </button>
                        <button disabled className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-xs font-medium text-gray-400 cursor-not-allowed">
                          <MessageCircle className="h-3.5 w-3.5" />
                          Mensagem
                        </button>
                        <button disabled className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 text-gray-300 cursor-not-allowed">
                          <Heart className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sobre */}
                <div className="bg-white rounded-2xl shadow-sm p-5">
                  <h2 className="text-sm font-bold text-gray-900 mb-2">Sobre</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {perfil.biografia || "Adicione uma biografia para se apresentar aos alunos."}
                  </p>
                </div>

                {/* Matérias */}
                {habilidadesResolvidas.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="h-4 w-4 text-[#6562ff]" />
                      <h2 className="text-sm font-bold text-gray-900">Matérias</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {habilidadesResolvidas.map((nome, i) => (
                        <span key={i} className="flex items-center gap-1.5 rounded-xl bg-[#6562ff]/8 px-3 py-1.5 text-xs font-medium text-[#6562ff]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#6562ff]" />
                          {nome}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Formação */}
                {perfil.formacao.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <GraduationCap className="h-4 w-4 text-violet-600" />
                      <h2 className="text-sm font-bold text-gray-900">Formação Acadêmica</h2>
                    </div>
                    <div className="space-y-3">
                      {perfil.formacao.map((f, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="h-7 w-7 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                              <GraduationCap className="h-3.5 w-3.5 text-violet-600" />
                            </div>
                            {i < perfil.formacao.length - 1 && <div className="w-px flex-1 bg-gray-100 mt-1.5" />}
                          </div>
                          <div className="pb-3 flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900">{f.titulo}</p>
                            <p className="text-xs text-violet-600 font-medium mt-0.5">{f.instituicao}</p>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-xs text-gray-400">
                                {formatarDataPreview(f.dtInicio)} – {formatarDataPreview(f.dtConclusao)}
                              </span>
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
                {perfil.experiencia.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Briefcase className="h-4 w-4 text-emerald-600" />
                      <h2 className="text-sm font-bold text-gray-900">Experiência Profissional</h2>
                    </div>
                    <div className="space-y-3">
                      {perfil.experiencia.map((exp, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="h-7 w-7 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                              <Briefcase className="h-3.5 w-3.5 text-emerald-600" />
                            </div>
                            {i < perfil.experiencia.length - 1 && <div className="w-px flex-1 bg-gray-100 mt-1.5" />}
                          </div>
                          <div className="pb-3 flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900">{exp.titulo}</p>
                            <p className="text-xs text-emerald-600 font-medium mt-0.5">{exp.instituicao}</p>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-xs text-gray-400">
                                {formatarDataPreview(exp.inicio)} – {formatarDataPreview(exp.fim)}
                              </span>
                              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">
                                {calcularDuracao(exp.inicio, exp.fim)}
                              </span>
                            </div>
                            {exp.descricao && (
                              <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">{exp.descricao}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="w-full lg:w-60 flex-shrink-0 space-y-3">

                {/* Card preço */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-br from-[#6562ff] to-[#8b5cf6] p-4 text-white">
                    <p className="text-xs font-semibold uppercase tracking-wider opacity-75 mb-0.5">Valor por aula</p>
                    <p className="text-2xl font-bold">R$ {perfil.valorHora}</p>
                    <p className="text-xs opacity-60">Pagamento seguro</p>
                  </div>
                  <div className="p-4 space-y-2">
                    <button disabled className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#6562ff]/50 py-2.5 text-xs font-semibold text-white cursor-not-allowed">
                      <Calendar className="h-3.5 w-3.5" />
                      Agendar Aula
                    </button>
                    <button disabled className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-xs font-medium text-gray-400 cursor-not-allowed">
                      <MessageCircle className="h-3.5 w-3.5" />
                      Enviar Mensagem
                    </button>
                  </div>
                </div>

                {/* Info rápida */}
                <div className="bg-white rounded-2xl shadow-sm p-4 space-y-2.5">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Informações</h3>
                  {[
                    { icon: Clock, label: "Experiência", value: "5+ anos" },
                    { icon: Globe, label: "Idioma", value: perfil.idiomas.length > 0 ? perfil.idiomas.join(", ") : "—" },
                    { icon: MapPin, label: "Localização", value: perfil.localizacao || "Não informada" },
                    { icon: CheckCircle, label: "Status", value: "Verificado", color: "text-green-600" },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <Icon className="h-3 w-3" />
                        <span className="text-xs">{label}</span>
                      </div>
                      <span className={`text-xs font-semibold truncate max-w-[100px] ${color ?? "text-gray-800"}`}>{value}</span>
                    </div>
                  ))}
                </div>

                {/* Disponibilidade */}
                <div className="bg-white rounded-2xl shadow-sm p-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Disponibilidade</h3>
                  <div className="grid grid-cols-7 gap-1">
                    {DIAS_ABREV.map((letra, i) => {
                      const nomeDia = diasSemana[i];
                      const ativo = (perfil.disponibilidade ?? []).includes(nomeDia);
                      return (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <span className="text-[9px] text-gray-400 font-medium">{letra}</span>
                          <div className={`h-6 w-6 rounded-lg flex items-center justify-center text-[9px] font-bold transition-colors ${ativo ? "bg-[#6562ff] text-white" : "bg-gray-100 text-gray-300"}`}>
                            {ativo ? "✓" : "–"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA */}
                <div className="w-full flex items-center justify-between rounded-2xl bg-gray-900 px-4 py-3.5 text-white">
                  <div className="text-left">
                    <p className="text-xs text-gray-400">Pronto para começar?</p>
                    <p className="text-xs font-semibold">Agende sua primeira aula</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
