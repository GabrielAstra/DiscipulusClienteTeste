"use client";

import { PerfilProfessor } from '@/types/teacher';
import { formatarDataPreview, calcularDuracao } from '@/utils/formatters';
import { diasSemana } from '@/constants/teacher';
import {
  X, MapPin, Star, Clock, CheckCircle, Calendar, MessageCircle, Heart,
  Globe, GraduationCap, Briefcase, Award
} from 'lucide-react';

interface ProfilePreviewModalProps {
  mostrarModal: boolean;
  onClose: () => void;
  perfil: PerfilProfessor;
}

export function ProfilePreviewModal({ 
  mostrarModal, 
  onClose, 
  perfil 
}: ProfilePreviewModalProps) {
  if (!mostrarModal) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-1 border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              Visualização do Perfil
            </h3>
            <button
              onClick={onClose}
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
              {/* {perfil.certificacoes.length > 0 && (
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
              )} */}
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
                  {diasSemana.map((dia) => (
                    <div key={dia} className="flex items-center justify-between">
                      <span className="text-gray-700">{dia}</span>
                        <span
                        className={`text-sm font-medium px-2 py-1 rounded-full ${
                          (perfil.disponibilidade ?? []).includes(dia)
                            ? "text-green-700 bg-green-100"
                            : "text-gray-500 bg-gray-100"
                        }`}
                      >
                        {(perfil.disponibilidade ?? []).includes(dia)
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
  );
}