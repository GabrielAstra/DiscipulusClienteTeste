"use client";

import { useState } from "react";
import { format, addDays, startOfWeek, addWeeks, subWeeks, startOfMonth, addMonths, subMonths, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import StatsCards from "@/components/teacher/StatsCards";

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

type Visualizacao = "diaria" | "semanal" | "mensal" | "lista";

const HORAS = Array.from({ length: 14 }, (_, i) => {
  const h = i + 7; // 07:00 até 20:00
  return `${String(h).padStart(2, "0")}:00`;
});

function horaParaMinutos(hora: string) {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

function corStatus(status: AulaAgendada["status"]) {
  switch (status) {
    case "confirmada": return "bg-violet-100 border-violet-400 text-violet-800";
    case "pendente":   return "bg-yellow-50 border-yellow-400 text-yellow-800";
    case "concluida":  return "bg-blue-50 border-blue-400 text-blue-800";
    case "cancelada":  return "bg-gray-100 border-gray-400 text-gray-500";
  }
}

// ── Visualização Semanal ──────────────────────────────────────────────────────
function ViewSemanal({ aulas, semanaBase }: { aulas: AulaAgendada[]; semanaBase: Date }) {
  const inicio = startOfWeek(semanaBase, { weekStartsOn: 1 });
  const dias = Array.from({ length: 7 }, (_, i) => addDays(inicio, i));

  return (
    <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
      <div className="min-w-[700px]">
        {/* Header dias */}
        <div className="grid border-b" style={{ gridTemplateColumns: "72px repeat(7, 1fr)" }}>
          <div className="p-3 text-xs font-semibold text-gray-400 border-r">GMT-3</div>
          {dias.map((dia) => {
            const hoje = isSameDay(dia, new Date());
            return (
              <div key={dia.toISOString()} className={`p-3 text-center border-r last:border-r-0 ${hoje ? "bg-violet-50" : ""}`}>
                <p className={`text-lg font-bold ${hoje ? "text-violet-600" : "text-gray-800"}`}>
                  {format(dia, "d")}
                </p>
                <p className={`text-xs font-medium ${hoje ? "text-violet-500" : "text-gray-400"}`}>
                  {format(dia, "EEE", { locale: ptBR })}
                </p>
              </div>
            );
          })}
        </div>

        {/* Grade de horários */}
        {HORAS.map((hora) => (
          <div key={hora} className="grid border-b last:border-b-0" style={{ gridTemplateColumns: "72px repeat(7, 1fr)" }}>
            <div className="p-2 text-xs text-violet-500 font-medium border-r flex items-start pt-3">
              {hora.replace(":", ".")}AM
            </div>
            {dias.map((dia) => {
              const aulasNaCelula = aulas.filter((a) => {
                if (!isSameDay(new Date(a.data), dia)) return false;
                const inicioAula = horaParaMinutos(a.horaInicio);
                const celulaMin = horaParaMinutos(hora);
                return inicioAula >= celulaMin && inicioAula < celulaMin + 60;
              });

              return (
                <div key={dia.toISOString()} className="border-r last:border-r-0 min-h-[72px] p-1 relative">
                  {aulasNaCelula.map((aula) => (
                    <div
                      key={aula.id}
                      className={`rounded-xl border-l-4 p-2 mb-1 cursor-pointer hover:opacity-90 transition-opacity ${corStatus(aula.status)}`}
                    >
                      <p className="text-xs font-semibold truncate">{aula.habilidade}</p>
                      <p className="text-xs opacity-70">{aula.horaInicio} - {aula.horaFim}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <img
                          src={aula.alunoAvatar || "/avatar.png"}
                          className="w-5 h-5 rounded-full object-cover border border-white"
                          onError={(e) => { e.currentTarget.src = "/avatar.png"; }}
                        />
                        <span className="text-xs truncate opacity-80">{aula.alunoNome}</span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Visualização Diária ───────────────────────────────────────────────────────
function ViewDiaria({ aulas, diaBase }: { aulas: AulaAgendada[]; diaBase: Date }) {
  const aulasDoDia = aulas.filter((a) => isSameDay(new Date(a.data), diaBase));

  return (
    <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
      <div className="min-w-[400px]">
        <div className="grid border-b" style={{ gridTemplateColumns: "72px 1fr" }}>
          <div className="p-3 text-xs font-semibold text-gray-400 border-r">GMT-3</div>
          <div className="p-3 text-center">
            <p className="text-lg font-bold text-violet-600">{format(diaBase, "d")}</p>
            <p className="text-xs font-medium text-violet-500">{format(diaBase, "EEEE", { locale: ptBR })}</p>
          </div>
        </div>
        {HORAS.map((hora) => {
          const aulasNaCelula = aulasDoDia.filter((a) => {
            const inicioAula = horaParaMinutos(a.horaInicio);
            const celulaMin = horaParaMinutos(hora);
            return inicioAula >= celulaMin && inicioAula < celulaMin + 60;
          });
          return (
            <div key={hora} className="grid border-b last:border-b-0" style={{ gridTemplateColumns: "72px 1fr" }}>
              <div className="p-2 text-xs text-violet-500 font-medium border-r flex items-start pt-3">
                {hora.replace(":", ".")}AM
              </div>
              <div className="min-h-[72px] p-1">
                {aulasNaCelula.map((aula) => (
                  <div key={aula.id} className={`rounded-xl border-l-4 p-3 mb-1 ${corStatus(aula.status)}`}>
                    <p className="text-sm font-semibold">{aula.alunoNome}</p>
                    <p className="text-xs font-medium opacity-80">{aula.horaInicio} – {aula.horaFim}</p>
                    <p className="text-xs opacity-60 mt-0.5">{aula.habilidade}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Visualização Mensal ───────────────────────────────────────────────────────
function ViewMensal({ aulas, mesBase }: { aulas: AulaAgendada[]; mesBase: Date }) {
  const inicioMes = startOfMonth(mesBase);
  const iniciaSemana = startOfWeek(inicioMes, { weekStartsOn: 1 });
  const dias = Array.from({ length: 42 }, (_, i) => addDays(iniciaSemana, i));
  const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
      <div className="grid grid-cols-7 border-b">
        {diasSemana.map((d) => (
          <div key={d} className="p-3 text-center text-xs font-semibold text-gray-500 border-r last:border-r-0">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {dias.map((dia) => {
          const doMes = dia.getMonth() === mesBase.getMonth();
          const hoje = isSameDay(dia, new Date());
          const aulasNoDia = aulas.filter((a) => isSameDay(new Date(a.data), dia));
          return (
            <div key={dia.toISOString()} className={`min-h-[90px] p-2 border-r border-b last:border-r-0 ${!doMes ? "bg-gray-50" : ""}`}>
              <span className={`text-xs font-bold inline-flex items-center justify-center w-6 h-6 rounded-full ${hoje ? "bg-violet-600 text-white" : doMes ? "text-gray-700" : "text-gray-300"}`}>
                {format(dia, "d")}
              </span>
              <div className="mt-1 space-y-0.5">
                {aulasNoDia.slice(0, 2).map((a) => (
                  <div key={a.id} className="text-xs rounded px-1 py-0.5 bg-violet-100 text-violet-700 truncate">{a.habilidade}</div>
                ))}
                {aulasNoDia.length > 2 && (
                  <div className="text-xs text-gray-400">+{aulasNoDia.length - 2}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Visualização Lista ────────────────────────────────────────────────────────
function ViewLista({ aulas }: { aulas: AulaAgendada[] }) {
  const ordenadas = [...aulas].sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

  if (ordenadas.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 text-center py-12 bg-white rounded-2xl border shadow-sm">
        <img src="/semAulaHd.png" alt="Sem aula" className="w-64 h-auto opacity-70" />
        <p className="text-gray-400">Nenhuma aula agendada.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm divide-y">
      {ordenadas.map((aula) => (
        <div key={aula.id} className="flex items-center justify-between gap-4 p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <img src={aula.alunoAvatar || "/avatar.png"} className="w-10 h-10 rounded-full object-cover" onError={(e) => { e.currentTarget.src = "/avatar.png"; }} />
            <div>
              <p className="font-medium text-sm">{aula.alunoNome}</p>
              <p className="text-xs text-gray-500">{aula.habilidade}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">
              {format(new Date(aula.data), "dd MMM", { locale: ptBR })} · {aula.horaInicio}–{aula.horaFim}
            </p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${corStatus(aula.status)}`}>{aula.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Componente Principal ──────────────────────────────────────────────────────
export default function AgendaTab({ aulas }: { aulas: AulaAgendada[] }) {
  const [visualizacao, setVisualizacao] = useState<Visualizacao>("semanal");
  const [dataBase, setDataBase] = useState(new Date());

  const totalAulas = aulas.length;
  const confirmadas = aulas.filter((a) => a.status === "confirmada").length;
  const pendentes = aulas.filter((a) => a.status === "pendente").length;

  function navegar(direcao: 1 | -1) {
    if (visualizacao === "semanal") setDataBase((d) => direcao === 1 ? addWeeks(d, 1) : subWeeks(d, 1));
    else if (visualizacao === "mensal") setDataBase((d) => direcao === 1 ? addMonths(d, 1) : subMonths(d, 1));
    else setDataBase((d) => addDays(d, direcao));
  }

  function tituloNavegacao() {
    if (visualizacao === "semanal") {
      const inicio = startOfWeek(dataBase, { weekStartsOn: 1 });
      return `${format(inicio, "d MMM", { locale: ptBR })} – ${format(addDays(inicio, 6), "d MMM yyyy", { locale: ptBR })}`;
    }
    if (visualizacao === "mensal") return format(dataBase, "MMMM yyyy", { locale: ptBR });
    return format(dataBase, "EEEE, d 'de' MMMM", { locale: ptBR });
  }

  const abas: { key: Visualizacao; label: string }[] = [
    { key: "diaria", label: "Diário" },
    { key: "semanal", label: "Semanal" },
    { key: "mensal", label: "Mensal" },
    { key: "lista", label: "Lista" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <StatsCards totalAulas={totalAulas} confirmadas={confirmadas} pendentes={pendentes} />

      {/* Toolbar */}
      <div className="bg-white rounded-2xl border shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
          {abas.map((aba) => (
            <button
              key={aba.key}
              onClick={() => setVisualizacao(aba.key)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                visualizacao === aba.key
                  ? "bg-white text-violet-600 shadow-sm border border-violet-200"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {aba.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button onClick={() => navegar(-1)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <span className="text-sm font-medium text-gray-700 min-w-[160px] text-center capitalize">
              {tituloNavegacao()}
            </span>
            <button onClick={() => navegar(1)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm shadow-violet-200">
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      {visualizacao === "semanal" && <ViewSemanal aulas={aulas} semanaBase={dataBase} />}
      {visualizacao === "diaria"  && <ViewDiaria  aulas={aulas} diaBase={dataBase} />}
      {visualizacao === "mensal"  && <ViewMensal  aulas={aulas} mesBase={dataBase} />}
      {visualizacao === "lista"   && <ViewLista   aulas={aulas} />}
    </div>
  );
}
