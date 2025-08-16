"use client";

import { useState, useEffect } from 'react';
import { Calendar, Clock, BookOpen } from 'lucide-react';
import { PerfilProfessor, Habilidade } from '@/types/teacher';
import { diasSemana } from '@/constants/teacher';
import { CalendarBlocker } from './CalendarBlocked';

interface SubjectsAndAvailabilityProps {
  perfil: PerfilProfessor;
  setPerfil: (perfil: PerfilProfessor) => void;
  editando: boolean;
  todasHabilidades: Habilidade[];
}

export function SubjectsAndAvailability({ 
  perfil, 
  setPerfil, 
  editando, 
  todasHabilidades 
}: SubjectsAndAvailabilityProps) {
  const [filtroHabilidade, setFiltroHabilidade] = useState("");
  const [habilidadesFiltradas, setHabilidadesFiltradas] = useState<Habilidade[]>([]);
  const [abaDisponibilidade, setAbaDisponibilidade] = useState<"semanal" | "bloqueios">("semanal");

  useEffect(() => {
    const filtered = todasHabilidades.filter((tag) =>
      tag.nome.toLowerCase().includes(filtroHabilidade.toLowerCase())
    );
    setHabilidadesFiltradas(filtered);
  }, [filtroHabilidade, todasHabilidades]);

  const handleToggleDayBlock = (dateString: string) => {
    const diasBloqueados = perfil.diasBloqueados || [];
    
    if (diasBloqueados.includes(dateString)) {
      setPerfil({
        ...perfil,
        diasBloqueados: diasBloqueados.filter(d => d !== dateString),
      });
    } else {
      setPerfil({
        ...perfil,
        diasBloqueados: [...diasBloqueados, dateString],
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return days[date.getDay()];
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Matérias */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Matérias</h3>
        </div>
        
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
                        checked={perfil.materias.includes(hab.id.toString())}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPerfil({
                              ...perfil,
                              materias: [...perfil.materias, hab.id.toString()],
                            });
                          } else {
                            setPerfil({
                              ...perfil,
                              materias: perfil.materias.filter(
                                (m) => m !== hab.id.toString()
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

      {/* Disponibilidade Semanal */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Disponibilidade Semanal
          </h3>
        </div>
        
        {editando ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 mb-3">
              Selecione os dias da semana que você está disponível
            </p>
            {diasSemana.map((dia) => (
              <label key={dia} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={perfil.disponibilidade.includes(dia)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPerfil({
                        ...perfil,
                        disponibilidade: [...perfil.disponibilidade, dia],
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
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">{dia}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {diasSemana.map((dia) => (
              <div key={dia} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                <span className="text-sm font-medium text-gray-700">{dia}</span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    perfil.disponibilidade.includes(dia)
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
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

      {/* Bloqueios de Agenda */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-5 h-5 text-red-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Bloqueios de Agenda
          </h3>
        </div>

        {editando ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Clique nos dias do calendário para bloquear/desbloquear sua agenda
            </p>
            
            <CalendarBlocker
              diasBloqueados={perfil.diasBloqueados || []}
              onToggleDay={handleToggleDayBlock}
            />

            {perfil.diasBloqueados && perfil.diasBloqueados.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Dias bloqueados ({perfil.diasBloqueados.length}):
                </p>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {perfil.diasBloqueados
                    .sort()
                    .map((dateString) => (
                      <div
                        key={dateString}
                        className="flex items-center justify-between p-2 bg-red-50 border border-red-200 rounded-lg text-sm"
                      >
                        <div>
                          <span className="font-medium text-red-800">
                            {formatDate(dateString)}
                          </span>
                          <span className="text-red-600 ml-1">
                            ({getDayOfWeek(dateString)})
                          </span>
                        </div>
                        <button
                          onClick={() => handleToggleDayBlock(dateString)}
                          className="text-red-600 hover:text-red-800 text-xs underline"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {perfil.diasBloqueados && perfil.diasBloqueados.length > 0 ? (
              <div>
                <p className="text-sm text-gray-600 mb-3">
                  Próximos dias bloqueados:
                </p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {perfil.diasBloqueados
                    .filter(date => new Date(date + 'T00:00:00') >= new Date())
                    .sort()
                    .slice(0, 10)
                    .map((dateString) => (
                      <div
                        key={dateString}
                        className="p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <div className="text-sm font-medium text-red-800">
                          {formatDate(dateString)}
                        </div>
                        <div className="text-xs text-red-600">
                          {getDayOfWeek(dateString)}
                        </div>
                      </div>
                    ))}
                </div>
                {perfil.diasBloqueados.filter(date => new Date(date + 'T00:00:00') >= new Date()).length > 10 && (
                  <p className="text-xs text-gray-500 mt-2">
                    E mais {perfil.diasBloqueados.filter(date => new Date(date + 'T00:00:00') >= new Date()).length - 10} dias...
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">
                  Nenhum dia bloqueado na agenda
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}