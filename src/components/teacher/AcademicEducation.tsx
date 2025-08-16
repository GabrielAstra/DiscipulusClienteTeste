"use client";

import { PerfilProfessor, FormacaoDTO } from '@/types/teacher';
import { formatarData, formatarDataInput } from '@/utils/formatters';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

interface AcademicEducationProps {
  perfil: PerfilProfessor;
  setPerfil: (perfil: PerfilProfessor) => void;
  editando: boolean;
  onRemoverFormacao: (id: string, index: number) => void;
}

export function AcademicEducation({ 
  perfil, 
  setPerfil, 
  editando, 
  onRemoverFormacao 
}: AcademicEducationProps) {

  const adicionarFormacao = () => {
    const novaFormacao: FormacaoDTO = {
      id: "",
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

  return (
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
                    onClick={() => onRemoverFormacao(formacao.id, index)}
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
                        atualizarFormacao(index, "titulo", e.target.value)
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
                        atualizarFormacao(index, "instituicao", e.target.value)
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
                <p className="text-gray-700 mb-1">{formacao.instituicao}</p>
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
  );
}