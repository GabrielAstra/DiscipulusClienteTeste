import { useState, useEffect } from 'react';
import { Clock, BookOpen } from 'lucide-react';
import { PerfilProfessor, Habilidade, HorarioDisponivel } from '@/types/teacher';
import { diasSemana } from '@/constants/teacher';
import { TimeSlotSelector } from './TimeSlotSelector';

interface SubjectsAndAvailabilityProps {
  perfil: PerfilProfessor;
  setPerfil: (perfil: PerfilProfessor) => void;
  editando: boolean;
  todasHabilidades: Habilidade[];
  setHorariosRemovidos: React.Dispatch<React.SetStateAction<string[]>>;
}
const formatarHorario = (hora: string) => {
  if (hora.length === 5) return `${hora}:00`; 
  return hora; 
};
export function SubjectsAndAvailability({
  perfil,
  setPerfil,
  editando,
  todasHabilidades,
}: SubjectsAndAvailabilityProps) {
  const [filtroHabilidade, setFiltroHabilidade] = useState("");
  const [habilidadesFiltradas, setHabilidadesFiltradas] = useState<Habilidade[]>([]);
  const [intervaloHorario, setIntervaloHorario] = useState<30 | 50 | 120>(50);

  useEffect(() => {
    const filtered = todasHabilidades.filter((tag) =>
      tag.nome.toLowerCase().includes(filtroHabilidade.toLowerCase())
    );
    setHabilidadesFiltradas(filtered);
  }, [filtroHabilidade, todasHabilidades]);
const adicionarSegundos = (hora: string) => {
  return hora.length === 5 ? `${hora}:00` : hora; 
};

 const handleAddHorario = (dia: string, horario: HorarioDisponivel) => {
  const disponibilidadeAtual = perfil.disponibilidadeHorarios || [];
  const horarioComSegundos = {
    ...horario,
    HoraInicial: adicionarSegundos(horario.HoraInicial),
    HoraFinal: adicionarSegundos(horario.HoraFinal),
  };

  const diaExistente = disponibilidadeAtual.find((d) => d.dia === dia);

  if (diaExistente) {
    const novaDisponibilidade = disponibilidadeAtual.map((d) =>
      d.dia === dia
        ? { ...d, horarios: [...d.horarios, horarioComSegundos] }
        : d
    );
    setPerfil({ ...perfil, disponibilidadeHorarios: novaDisponibilidade });
  } else {
    setPerfil({
      ...perfil,
      disponibilidadeHorarios: [
        ...disponibilidadeAtual,
        { dia, horarios: [horarioComSegundos] },
      ],
    });
  }
};


useEffect(() => {
  if (!perfil.disponibilidadeHorarios) return;

  const precisaNormalizar = perfil.disponibilidadeHorarios.some(d =>
    d.horarios.some(h => h.HoraInicial.length === 5 || h.HoraFinal.length === 5)
  );

  if (!precisaNormalizar) return; 

  const normalizados = perfil.disponibilidadeHorarios.map(d => ({
    ...d,
    horarios: d.horarios.map(h => ({
      ...h,
      HoraInicial: adicionarSegundos(h.HoraInicial),
      HoraFinal: adicionarSegundos(h.HoraFinal),
    })),
  }));

  setPerfil({ ...perfil, disponibilidadeHorarios: normalizados });
}, [perfil.disponibilidadeHorarios]);


  

  const handleRemoveHorario = (dia: string, horario: HorarioDisponivel) => {
  const disponibilidadeAtual = perfil.disponibilidadeHorarios || [];

  const novaDisponibilidade = disponibilidadeAtual
    .map((d) =>
      d.dia === dia
        ? {
            ...d,
            horarios: d.horarios.filter(
              (h) =>
                h.HoraInicial !== horario.HoraInicial ||
                h.HoraFinal !== horario.HoraFinal
            ),
          }
        : d
    )
    .filter((d) => d.horarios.length > 0);

  setPerfil({ ...perfil, disponibilidadeHorarios: novaDisponibilidade });
};



const getHorariosPorDia = (dia: string): HorarioDisponivel[] => {
  const diaDisponivel = (perfil.disponibilidadeHorarios || []).find(
    (d) => d.dia === dia
  );
  if (!diaDisponivel) return [];
  
  return diaDisponivel.horarios.map(h => ({
    ...h,
    HoraInicial: adicionarSegundos(h.HoraInicial),
    HoraFinal: adicionarSegundos(h.HoraFinal),
  }));
};



  return (
    <div className="space-y-8" data-onboarding="subjects">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="w-5 h-5 text-blue-600" />
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
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
                        checked={perfil.habilidades.includes(hab.id.toString())}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPerfil({
                              ...perfil,
                              habilidades: [...perfil.habilidades, hab.id.toString()],
                            });
                          } else {
                            setPerfil({
                              ...perfil,
                              habilidades: perfil.habilidades.filter(
                                (id) => id !== hab.id.toString()
                              ),
                            });
                          }
                        }}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
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
                    Nenhuma matéria encontrada para &quot;{filtroHabilidade}&quot;
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
            {perfil.habilidades.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {perfil.habilidades.map((habilidadeId) => {
                  const habilidade = todasHabilidades.find(
                    (hab) => hab.id.toString() === habilidadeId
                  );

                  return (
                    <span
                      key={habilidadeId}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200"
                    >
                      {habilidade?.nome ?? habilidadeId}
                    </span>
                  );
                })}
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
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Disponibilidade Semanal
          </h3>
        </div>

        {editando ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Duração das aulas
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setIntervaloHorario(30)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    intervaloHorario === 30
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  30 minutos
                </button>
                <button
                  onClick={() => setIntervaloHorario(50)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    intervaloHorario === 50
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  50 minutos
                </button>
                <button
                  onClick={() => setIntervaloHorario(120)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    intervaloHorario === 120
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  2 horas
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Selecione a duração padrão das suas aulas
              </p>
            </div>

            <div className="border-t pt-6">
              <p className="text-sm text-gray-600 mb-4">
                Selecione os dias e horários em que você está disponível
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {diasSemana.map((dia) => (
                  <div key={dia} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <TimeSlotSelector
                      dia={dia}
                      horarios={getHorariosPorDia(dia)}
                      intervalo={intervaloHorario}
                      onAddHorario={handleAddHorario}
                      onRemoveHorario={handleRemoveHorario}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {diasSemana.map((dia) => {
              const horarios = getHorariosPorDia(dia);
              return (
                <div key={dia} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-900">{dia}</span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        horarios.length > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {horarios.length > 0
                        ? `${horarios.length} ${horarios.length === 1 ? 'horário' : 'horários'}`
                        : "Indisponível"}
                    </span>
                  </div>
                  {horarios.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {horarios.map((horario, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-200"
                        >
    {formatarHorario(horario.HoraInicial)} - {formatarHorario(horario.HoraFinal)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
