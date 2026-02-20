"use client";

import { PerfilProfessor, ExperienciaDTO } from '@/types/teacher';
import { formatarData, formatarDataInput } from '@/utils/formatters';
import { Briefcase, Plus, Trash2 } from 'lucide-react';

interface ProfessionalExperienceProps {
  perfil: PerfilProfessor;
  setPerfil: (perfil: PerfilProfessor) => void;
  editando: boolean;
  onRemoverExperiencia: (id: string) => void;
}

export function ProfessionalExperience({ 
  perfil, 
  setPerfil, 
  editando, 
  onRemoverExperiencia 
}: ProfessionalExperienceProps) {

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
            key={exp.id || `temp-${index}`}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            {editando ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-md font-medium text-gray-900">
                    Experiência #{index + 1}
                  </h4>
                  <button
                    onClick={() => onRemoverExperiencia(exp.id)}
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
                        atualizarExperiencia(index, "titulo", e.target.value)
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
                        atualizarExperiencia(index, "instituicao", e.target.value)
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
                      atualizarExperiencia(index, "descricao", e.target.value)
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
  );
}