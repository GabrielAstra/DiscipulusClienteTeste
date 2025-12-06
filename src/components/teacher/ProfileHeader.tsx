"use client";

import { useState } from 'react';
import { PerfilProfessor, Habilidade } from '@/types/teacher';
import { capitais, idiomasDisponiveis, mapaDiasSemana } from '@/constants/teacher';
import { aplicarMascaraTelefone } from '@/utils/formatters';
import { salvarAgenda } from '@/lib/service/agenda/agenda.service';
import { Edit3, Save, X, Camera, Upload, Eye, Globe } from 'lucide-react';
import { AgendaDiaPayload } from '@/types/teacher';

interface ProfileHeaderProps {
  perfil: PerfilProfessor;
  setPerfil: (perfil: PerfilProfessor) => void;
  editando: boolean;
  setEditando: (editando: boolean) => void;
  salvandoPerfil: boolean;
  uploadingPhoto: boolean;
  todasHabilidades: Habilidade[];
  onSalvar: () => void;
  onFileUpload: (file: File) => void;
  onShowPreview: () => void;
}

export function ProfileHeader({
  perfil,
  setPerfil,
  editando,
  setEditando,
  salvandoPerfil,
  uploadingPhoto,
  onSalvar,
  onFileUpload,
  onShowPreview
}: ProfileHeaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [filtroIdioma, setFiltroIdioma] = useState("");
  const [idiomasFiltrados, setIdiomasFiltrados] = useState<string[]>(idiomasDisponiveis);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileUpload(files[0]);
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

  const handleIdiomaFilterChange = (value: string) => {
    setFiltroIdioma(value);
    const filtered = idiomasDisponiveis.filter((idioma) =>
      idioma.toLowerCase().includes(value.toLowerCase())
    );
    setIdiomasFiltrados(filtered);
  };

  const prepararPayloadAgenda = (): AgendaDiaPayload[] => {
    if (!perfil.disponibilidadeHorarios) return [];

    return perfil.disponibilidadeHorarios.map((d) => ({
      diaSemana: mapaDiasSemana[d.dia],
      horarios: d.horarios.map((h) => {
        const horaInicial = `${h.inicio}:00`;
        const horaFinal = `${h.fim}:00`;

        return {
          horaInicial,
          horaFinal,
          agendaDisponivelEnum: 1,
        };
      }),
    }));
  };

  const handleSalvarComAgenda = async () => {
    try {
      const payloadAgenda = prepararPayloadAgenda();

      if (payloadAgenda.length > 0) {
        console.log("📋 Salvando agenda:", JSON.stringify(payloadAgenda, null, 2));

        const response = await salvarAgenda(payloadAgenda);

        if (response?.sucesso) {
          console.log("✅ Agenda salva com sucesso!");
        } else {
          console.error(`❌ ${response?.mensagem ?? "Erro ao salvar agenda"}`);
        }
      }

      onSalvar();
    } catch (err) {
      console.error("💥 Erro ao salvar:", err);
      alert("❌ Erro ao salvar as informações");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Informações Pessoais
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={onShowPreview}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Visualizar Perfil</span>
          </button>
          {!editando ? (
            <button
              onClick={() => setEditando(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>Editar</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSalvarComAgenda}
                disabled={salvandoPerfil}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {salvandoPerfil ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Salvando...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Salvar</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setEditando(false)}
                disabled={salvandoPerfil}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onFileUpload(file);
                      }}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      {uploadingPhoto ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400" />
                          <div className="text-sm text-gray-600">
                            <span className="font-medium text-blue-600">Clique para fazer upload</span>
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              Valor por aula
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    onChange={(e) => handleIdiomaFilterChange(e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        ) : (
          <p className="text-gray-900">{perfil.biografia}</p>
        )}
      </div>
    </div>
  );
}
