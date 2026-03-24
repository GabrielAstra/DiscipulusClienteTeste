"use client";

import { useRouter } from "next/navigation";
import { DisponibilidadeHorario, Professor } from "../types/professor";
import { Check, X, ChevronLeft, ChevronRight, Clock, MessageSquare } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { DadosAgendamento } from "../types/agendamento";
import { useModal } from "@/context/ModalContext";
import { iniciarCheckout } from "@/lib/service/agendamento/agendamento.service";

interface PropriedadesModalAgendamento {
  professor: Professor;
  aberto: boolean;
  aoFechar: () => void;
  aoIrParaPagamento: (dados: DadosAgendamento) => void;
}

interface SlotHorario {
  inicio: string;
  fim: string;
  disponivel: boolean;
  horarioId: string;
  agendaId: string;
}

const MESES = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro",
];
const DIAS_SEMANA_ABREV = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

export default function ModalAgendamento({
  professor,
  aberto,
  aoFechar,
  aoIrParaPagamento,
}: PropriedadesModalAgendamento) {
  const router = useRouter();
  const { abrirModal, fecharModal } = useModal();

  const hoje = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [mesAtual, setMesAtual] = useState(() => new Date(hoje.getFullYear(), hoje.getMonth(), 1));
  const [dataSelecionada, setDataSelecionada] = useState<string>("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [horarioIdSelecionado, setHorarioIdSelecionado] = useState("");
  const [agendaIdSelecionado, setAgendaIdSelecionado] = useState("");
  const [duracao, setDuracao] = useState(60);
  const [observacoes, setObservacoes] = useState("");
  const [mostrarObservacoes, setMostrarObservacoes] = useState(false);
  const [carregandoCheckout, setCarregandoCheckout] = useState(false);

  useEffect(() => {
    if (aberto) abrirModal();
    else fecharModal();
    return () => fecharModal();
  }, [aberto]);

  const diasSemanaDisponiveis = useMemo(() => {
    const arr = professor.disponibilidade?.$values || [];
    return new Set(arr.map((d: { diaSemana: number }) => d.diaSemana));
  }, [professor.disponibilidade]);

  const dataMax = useMemo(() => {
    const d = new Date(hoje);
    d.setDate(d.getDate() + 60);
    return d;
  }, [hoje]);

  const celulasCalendario = useMemo(() => {
    const ano = mesAtual.getFullYear();
    const mes = mesAtual.getMonth();
    const primeiroDia = new Date(ano, mes, 1).getDay();
    const totalDias = new Date(ano, mes + 1, 0).getDate();

    const celulas: (null | { data: Date; dataStr: string; disponivel: boolean })[] = [];

    for (let i = 0; i < primeiroDia; i++) celulas.push(null);

    for (let d = 1; d <= totalDias; d++) {
      const data = new Date(ano, mes, d);
      const dataStr = data.toISOString().split("T")[0];
      const passado = data < hoje;
      const muitoLonge = data > dataMax;
      const temDisp = diasSemanaDisponiveis.has(data.getDay());
      celulas.push({
        data,
        dataStr,
        disponivel: !passado && !muitoLonge && temDisp,
      });
    }

    return celulas;
  }, [mesAtual, hoje, dataMax, diasSemanaDisponiveis]);

  const gerarSlots = (dataString: string): SlotHorario[] => {
    const data = new Date(dataString + "T00:00:00");
    const diaSemanaNum = data.getDay();
    const arr = professor.disponibilidade?.$values || [];
    const diaDisp = arr.find((d: { diaSemana: number; horarios?: { $values?: unknown[] }; agendaId?: string }) => d.diaSemana === diaSemanaNum);
    if (!diaDisp) return [];

    const ocupados = new Set(
      (professor.horariosOcupados?.$values || [])
        .filter((o: { data: string; horaInicio: string }) => o.data === dataString)
        .map((o: { data: string; horaInicio: string }) => o.horaInicio)
    );

    const slots: SlotHorario[] = [];
    const horarios = diaDisp.horarios?.$values || [];

    horarios.forEach((h: DisponibilidadeHorario) => {
      const [hIni, mIni] = (h.horaInicial ?? "").split(":").map(Number);
      const [hFim, mFim] = (h.horaFinal ?? "").split(":").map(Number);
      if (isNaN(hIni) || isNaN(hFim)) return;

      const iniMin = hIni * 60 + mIni;
      const fimMin = hFim * 60 + mFim;

      for (let m = iniMin; m < fimMin; m += 30) {
        const hS = String(Math.floor(m / 60)).padStart(2, "0");
        const mS = String(m % 60).padStart(2, "0");
        const hE = String(Math.floor((m + 30) / 60)).padStart(2, "0");
        const mE = String((m + 30) % 60).padStart(2, "0");
        const ini = `${hS}:${mS}`;
        slots.push({
          inicio: ini,
          fim: `${hE}:${mE}`,
          disponivel: !ocupados.has(ini),
          horarioId: h.id || h.idAgenda || "",
          agendaId: diaDisp.agendaId || "",
        });
      }
    });

    return slots;
  };

  const slots = dataSelecionada ? gerarSlots(dataSelecionada) : [];
  const valorHora = professor.valorHora || 0;
  const precoTotal = (valorHora * duracao) / 60;

  const dataSelecionadaObj = dataSelecionada
    ? new Date(dataSelecionada + "T00:00:00")
    : null;

  const podeContinuar = dataSelecionada && horarioSelecionado;

  const calcularMediaAvaliacoes = () => {
    if (professor.mediaAvaliacoes && professor.totalAvaliacoes)
      return { nota: professor.mediaAvaliacoes, total: professor.totalAvaliacoes };
    const avs = (professor.totalAvaliacoes as { $values?: { nota: number }[] })?.$values || [];
    if (!avs.length) return { nota: 0, total: 0 };
    return { nota: avs.reduce((s: number, a: { nota: number }) => s + a.nota, 0) / avs.length, total: avs.length };
  };

  const lidarComPagamento = async () => {
    setCarregandoCheckout(true);
    try {
      const resposta = await iniciarCheckout({
        professorId: professor.usuarioID,
        agendaId: agendaIdSelecionado,
        horarioId: horarioIdSelecionado,
        diaMesAgendamento: new Date(dataSelecionada + "T00:00:00").toISOString(),
        observacao: observacoes,
      });

      if (!resposta.success) throw new Error(resposta.message || "Erro ao iniciar checkout");

      const { checkoutSessaoId, tokenPublico, horarioInicial, horarioFinal } = resposta.data;
      const avaliacoes = calcularMediaAvaliacoes();

      const dadosAgendamento: DadosAgendamento = {
        professorId: professor.usuarioID,
        professorNome: professor.nome,
        professorAvatar: professor.urlFoto || "/avatar.png",
        professorValorHora: valorHora,
        professorAvaliacao: avaliacoes.total > 0 ? avaliacoes : undefined,
        dataSelecionada,
        diaSemana: DIAS_SEMANA_ABREV[dataSelecionadaObj?.getDay() ?? 0],
        horarioSelecionado: horarioInicial || horarioSelecionado,
        horarioFinal,
        duracao,
        observacoes,
        precoTotal: resposta.data.valor ?? precoTotal,
        checkoutSessaoId,
        tokenPublico,
      };

      sessionStorage.setItem("dadosAgendamento", JSON.stringify(dadosAgendamento));
      aoIrParaPagamento(dadosAgendamento);

      setDataSelecionada("");
      setHorarioSelecionado("");
      setHorarioIdSelecionado("");
      setAgendaIdSelecionado("");
      setObservacoes("");

      router.push(resposta.data.urlCheckout || `/checkout/${tokenPublico}`);
    } catch (err: unknown) {
      const error = err as { message?: string };
      alert(error.message || "Erro ao iniciar checkout. Tente novamente.");
    } finally {
      setCarregandoCheckout(false);
    }
  };

  if (!aberto) return null;

  const mesAnteriorDisp = mesAtual > new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  const proximoMesDisp = new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 2, 0) <= dataMax;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src={professor.urlFoto}
              alt={professor.nome}
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => { e.currentTarget.src = "/avatar.png"; }}
            />
            <div>
              <p className="text-xs text-gray-400 font-medium">Agendar aula com</p>
              <p className="text-sm font-bold text-gray-900">{professor.nome}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {valorHora > 0 && (
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                R$ {valorHora.toFixed(2)}/h
              </span>
            )}
            <button onClick={aoFechar} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">

          {/* Coluna esquerda — calendário + slots */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* Calendário */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900">
                  {MESES[mesAtual.getMonth()]} {mesAtual.getFullYear()}
                </h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() - 1, 1))}
                    disabled={!mesAnteriorDisp}
                    className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1, 1))}
                    disabled={!proximoMesDisp}
                    className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Cabeçalho dias da semana */}
              <div className="grid grid-cols-7 mb-1">
                {DIAS_SEMANA_ABREV.map((d) => (
                  <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">
                    {d}
                  </div>
                ))}
              </div>

              {/* Células */}
              <div className="grid grid-cols-7 gap-1">
                {celulasCalendario.map((celula, i) => {
                  if (!celula) return <div key={`empty-${i}`} />;
                  const isSelected = dataSelecionada === celula.dataStr;
                  const isHoje = celula.dataStr === hoje.toISOString().split("T")[0];

                  return (
                    <button
                      key={celula.dataStr}
                      onClick={() => {
                        if (!celula.disponivel) return;
                        setDataSelecionada(celula.dataStr);
                        setHorarioSelecionado("");
                        setHorarioIdSelecionado("");
                        setAgendaIdSelecionado("");
                      }}
                      disabled={!celula.disponivel}
                      className={`
                        relative h-9 w-full rounded-lg text-sm font-medium transition-all
                        ${isSelected
                          ? "bg-blue-600 text-white shadow-md"
                          : celula.disponivel
                          ? "hover:bg-blue-50 text-gray-800 hover:text-blue-700"
                          : "text-gray-300 cursor-not-allowed"
                        }
                        ${isHoje && !isSelected ? "ring-2 ring-blue-300 ring-offset-1" : ""}
                      `}
                    >
                      {celula.data.getDate()}
                      {celula.disponivel && !isSelected && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slots de horário */}
            {dataSelecionada && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-gray-900">
                    Horários —{" "}
                    <span className="font-normal text-gray-500">
                      {dataSelecionadaObj?.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "short" })}
                    </span>
                  </h3>
                </div>

                {slots.length > 0 ? (
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {slots.map((slot) => {
                      const isSelected = horarioSelecionado === slot.inicio;
                      return (
                        <button
                          key={slot.inicio}
                          onClick={() => {
                            if (!slot.disponivel) return;
                            setHorarioSelecionado(slot.inicio);
                            setHorarioIdSelecionado(slot.horarioId);
                            setAgendaIdSelecionado(slot.agendaId);
                            const [hI, mI] = slot.inicio.split(":").map(Number);
                            const [hF, mF] = slot.fim.split(":").map(Number);
                            setDuracao(hF * 60 + mF - (hI * 60 + mI));
                          }}
                          disabled={!slot.disponivel}
                          className={`
                            py-2.5 rounded-xl text-xs font-semibold border transition-all
                            ${!slot.disponivel
                              ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed line-through"
                              : isSelected
                              ? "border-blue-600 bg-blue-600 text-white shadow-md"
                              : "border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50"
                            }
                          `}
                        >
                          {slot.inicio}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 text-center py-6">
                    Nenhum horário disponível para esta data
                  </p>
                )}
              </div>
            )}

            {podeContinuar && (
              <div>
                <button
                  onClick={() => setMostrarObservacoes(!mostrarObservacoes)}
                  className="flex items-center gap-2 text-sm cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  {mostrarObservacoes ? "Ocultar observações" : "Adicionar observações (opcional)"}
                </button>
                {mostrarObservacoes && (
                  <textarea
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    placeholder="Descreva o que você gostaria de focar na aula..."
                    className="mt-3 w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 resize-none transition-colors"
                    rows={3}
                  />
                )}
              </div>
            )}
          </div>

          <div className="w-64 border-l border-gray-100 bg-gray-50 flex flex-col p-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Resumo</h3>

            <div className="flex-1 space-y-4">
              {/* Professor */}
              <div className="flex items-center gap-2">
                <img
                  src={professor.urlFoto}
                  alt={professor.nome}
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => { e.currentTarget.src = "/avatar.png"; }}
                />
                <span className="text-sm font-semibold text-gray-800 truncate">{professor.nome}</span>
              </div>

              <div className="space-y-2">
                {/* Data */}
                <div className="bg-white rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-0.5">Data</p>
                  {dataSelecionadaObj ? (
                    <p className="text-sm font-semibold text-gray-800 capitalize">
                      {dataSelecionadaObj.toLocaleDateString("pt-BR", { weekday: "short", day: "numeric", month: "short" })}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-300">Não selecionada</p>
                  )}
                </div>

                {/* Horário */}
                <div className="bg-white rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-0.5">Horário</p>
                  {horarioSelecionado ? (
                    <p className="text-sm font-semibold text-gray-800">{horarioSelecionado}</p>
                  ) : (
                    <p className="text-sm text-gray-300">Não selecionado</p>
                  )}
                </div>

                {/* Duração */}
                {horarioSelecionado && (
                  <div className="bg-white rounded-xl p-3 border border-gray-100">
                    <p className="text-xs text-gray-400 mb-0.5">Duração</p>
                    <p className="text-sm font-semibold text-gray-800">{duracao} min</p>
                  </div>
                )}
              </div>
            </div>

            {/* Preço + botão */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              {podeContinuar && (
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-xs text-gray-400">Total</span>
                  <span className="text-xl font-bold text-gray-900">R$ {precoTotal.toFixed(2)}</span>
                </div>
              )}

              <button
                onClick={lidarComPagamento}
                disabled={!podeContinuar || carregandoCheckout}
                className={`
                  w-full py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2
                  ${podeContinuar && !carregandoCheckout
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                {carregandoCheckout ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Aguarde...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Ir para pagamento
                  </>
                )}
              </button>

              {!podeContinuar && (
                <p className="text-xs text-gray-400 text-center mt-2">
                  {!dataSelecionada ? "Selecione uma data" : "Selecione um horário"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
