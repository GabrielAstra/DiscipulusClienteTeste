import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import StatsCards from "@/components/teacher/StatsCards";
import { ptBR } from "date-fns/locale";

interface AulaAgendada {
  id: string;
  alunoNome: string;
  alunoAvatar: string;
  habilidade: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  status: "confirmada" | "pendente" | "concluida" | "cancelada";
}

export default function AgendaTab({ aulas }: { aulas: AulaAgendada[] }) {
  const [diaSelecionado, setDiaSelecionado] = useState<Date>(new Date());

  const diasComAula = aulas.map((a) => new Date(a.data));

  const aulasDoMes = aulas.filter(
    (a) =>
      new Date(a.data).getMonth() === diaSelecionado.getMonth() &&
      new Date(a.data).getFullYear() === diaSelecionado.getFullYear()
  );

  const totalAulasMes = aulasDoMes.length;
  const confirmadasMes = aulasDoMes.filter((a) => a.status === "confirmada").length;
  const pendentesMes = aulasDoMes.filter((a) => a.status === "pendente").length;

  const aulasDoDia = aulas.filter(
    (a) =>
      format(new Date(a.data), "yyyy-MM-dd") ===
      format(diaSelecionado, "yyyy-MM-dd")
  );

  return (
    <div className="flex flex-col gap-6">
      <StatsCards
        totalAulas={totalAulasMes}
        confirmadas={confirmadasMes}
        pendentes={pendentesMes}
      />

      <div className="grid md:grid-cols-[320px_1fr] gap-6">
        <div className="bg-white rounded-2xl border p-4 shadow-sm w-full md:w-[320px]">
          <Calendar
            mode="single"
            selected={diaSelecionado}
            onSelect={(d) => d && setDiaSelecionado(d)}
            locale={ptBR}
            modifiers={{ comAula: diasComAula }}
            modifiersClassNames={{
              comAula: "bg-indigo-100 text-indigo-700 font-bold",
            }}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold mb-4">
            {format(diaSelecionado, "EEEE, d 'de' MMMM", { locale: ptBR })}
          </h3>

          {aulasDoDia.length === 0 ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-gray-500">Nenhuma aula neste dia.</p>
              <img
                src="/semAulaHd.png"
                alt="Sem aula"
                className="w-full max-w-sm h-auto"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {aulasDoDia.map((aula) => (
                <div
                  key={aula.id}
                  className="flex items-center justify-between gap-4 bg-white border rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={aula.alunoAvatar}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{aula.alunoNome}</p>
                      <p className="text-sm text-gray-500">{aula.habilidade}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-medium">
                      {aula.horaInicio} - {aula.horaFim}
                    </p>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        aula.status === "confirmada"
                          ? "bg-green-100 text-green-700"
                          : aula.status === "pendente"
                          ? "bg-yellow-100 text-yellow-700"
                          : aula.status === "concluida"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {aula.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
