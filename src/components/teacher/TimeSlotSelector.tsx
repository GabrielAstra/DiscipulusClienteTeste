import { Plus, Trash2 } from 'lucide-react';
import { HorarioDisponivel } from '@/types/teacher';

interface TimeSlotSelectorProps {
  dia: string;
  horarios: HorarioDisponivel[];
  intervalo: number;
  onAddHorario: (dia: string, horario: HorarioDisponivel) => void;
  onRemoveHorario: (dia: string, horarioId: string) => void;
}


export function TimeSlotSelector({
  dia,
  horarios,
  intervalo,
  onAddHorario,
  onRemoveHorario,
}: TimeSlotSelectorProps) {
  const gerarHorarios = () => {
  const horariosDisponiveis: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hora = String(h).padStart(2, '0');
      const minuto = String(m).padStart(2, '0');
      // Adiciona sempre os segundos :00
      horariosDisponiveis.push(`${hora}:${minuto}:00`);
    }
  }
  return horariosDisponiveis;
};


  const horariosDisponiveis = gerarHorarios();

  const calcularHorarioFim = (inicio: string, duracaoMinutos: number) => {
    const [horaInicio, minutoInicio] = inicio.split(':').map(Number);
    const totalMinutos = horaInicio * 60 + minutoInicio + duracaoMinutos;

    const horaFim = Math.floor(totalMinutos / 60) % 24;
    const minutoFim = totalMinutos % 60;

    return `${String(horaFim).padStart(2, '0')}:${String(minutoFim).padStart(2, '0')}:00`;
  };


  const handleAddSlot = (inicio: string) => {
    const fim = calcularHorarioFim(inicio, intervalo);

    onAddHorario(dia, {
      HoraInicial:inicio,
      HoraFinal: fim
    });

  };


  const adicionarSegundos = (hora: string) => {
  return hora.length === 5 ? `${hora}:00` : hora; 
};

const formatarIntervalo = (horario: HorarioDisponivel) => {
  return `${adicionarSegundos(horario.HoraInicial)} - ${adicionarSegundos(horario.HoraFinal)}`;
};


  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{dia}</span>
        <span className="text-xs text-gray-500">
          {horarios.length} {horarios.length === 1 ? 'horário' : 'horários'}
        </span>
      </div>

      {horarios.length > 0 && (
        <div className="space-y-2">
          {horarios.map((horario, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-lg"
            >
              <span className="text-sm text-green-800 font-medium">
                {formatarIntervalo(horario)}
              </span>
              <button
                onClick={() => horario.id && onRemoveHorario(dia, horario.id)}
                className="text-red-600 hover:text-red-800 transition-colors"
                title="Remover horário"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="relative">
        <select
          onChange={(e) => {
            if (e.target.value) {
              handleAddSlot(e.target.value);
              e.target.value = '';
            }
          }}
          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none pr-8"
        >
          <option value="">+ Adicionar horário</option>
          {horariosDisponiveis.map((hora) => {
            const fim = calcularHorarioFim(hora, intervalo);
            const jaSelecionado = horarios.some(
              (h) => h.HoraInicial === hora
            );
            return (
              <option key={hora} value={hora} disabled={jaSelecionado}>
                {hora} - {fim} ({intervalo} min)
              </option>
            );
          })}
        </select>
        <Plus className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}
