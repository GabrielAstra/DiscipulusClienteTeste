"use client";

import { useRouter } from "next/navigation";
import { Professor } from "../types/professor";
import { Check, X, Calendar, Clock } from "lucide-react";
import { useState, useMemo } from "react";
import { DadosAgendamento } from "../types/agendamento";

interface PropriedadesModalAgendamento {
  professor: Professor;
  aberto: boolean;
  aoFechar: () => void;
  aoIrParaPagamento: (dados: DadosAgendamento) => void;
}

interface DiaDisponivel {
  data: string;
  dataCompleta: Date;
  dia: number;
  mes: string;
  diaSemana: string;
  diaSemanaAbrev: string;
  temDisponibilidade: boolean;
}

interface SlotHorario {
  inicio: string;
  fim: string;
  disponivel: boolean;
}

export default function ModalAgendamento({
  professor,
  aberto,
  aoFechar,
}: PropriedadesModalAgendamento) {
  const [passo, setPasso] = useState(1);
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [duracao, setDuracao] = useState(60);
  const [observacoes, setObservacoes] = useState("");
  const router = useRouter();

  const nomesDias = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  const nomesDiasAbrev = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const diasDisponiveis: DiaDisponivel[] = useMemo(() => {
    const dias: DiaDisponivel[] = [];
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const diasDisponivelString = (professor.disponibilidade as any)?.$values || [];

    for (let i = 1; i <= 30; i++) {
      const data = new Date(hoje);
      data.setDate(hoje.getDate() + i);

      const diaSemana = nomesDias[data.getDay()];
      const temDisponibilidade = diasDisponivelString.includes(diaSemana);

      dias.push({
        data: data.toISOString().split("T")[0],
        dataCompleta: data,
        dia: data.getDate(),
        mes: data.toLocaleDateString("pt-BR", { month: "short" }),
        diaSemana: diaSemana,
        diaSemanaAbrev: nomesDiasAbrev[data.getDay()],
        temDisponibilidade,
      });
    }

    return dias;
  }, [professor.disponibilidade]);

  const gerarSlotsHorario = (dataString: string): SlotHorario[] => {
    const data = new Date(dataString + "T00:00:00");
    

    const diaSemana = nomesDias[data.getDay()];

    const horariosDisponiveis = (professor.disponibilidadeHorario as any)?.$values || [];
    const horariosDoDia = horariosDisponiveis.filter(
      (h: any) => h.diaSemana === diaSemana
    );
    const slots: SlotHorario[] = [];

    horariosDoDia.forEach((horario: any) => {
      const horaInicial = horario.horaInicial || "";
      const horaFinal = horario.horaFinal || "";

      if (!horaInicial || !horaFinal) return;

      const [horaInicio, minutoInicio] = horaInicial.split(":").map(Number);
      const [horaFim, minutoFim] = horaFinal.split(":").map(Number);

      const inicioMinutos = horaInicio * 60 + minutoInicio;
      const fimMinutos = horaFim * 60 + minutoFim;

      for (let minuto = inicioMinutos; minuto < fimMinutos; minuto += 30) {
        const hora = Math.floor(minuto / 60);
        const min = minuto % 60;
        const horaStr = hora.toString().padStart(2, "0");
        const minStr = min.toString().padStart(2, "0");

        const proximaHora = Math.floor((minuto + 30) / 60);
        const proximoMin = (minuto + 30) % 60;
        const proximaHoraStr = proximaHora.toString().padStart(2, "0");
        const proximoMinStr = proximoMin.toString().padStart(2, "0");

        slots.push({
          inicio: `${horaStr}:${minStr}`,
          fim: `${proximaHoraStr}:${proximoMinStr}`,
          disponivel: true,
        });
      }
    });

    return slots;
  };

  const slotsDisponiveis = dataSelecionada
    ? gerarSlotsHorario(dataSelecionada)
    : [];

  const valorHora = professor.valorHora || 0;
  const precoTotal = (valorHora * duracao) / 60;

  const calcularMediaAvaliacoes = (): { nota: number; total: number } => {
    if (professor.mediaAvaliacoes && professor.totalAvaliacoes) {
      return {
        nota: professor.mediaAvaliacoes,
        total: professor.totalAvaliacoes,
      };
    }

    const avaliacoes = (professor.totalAvaliacoes as any)?.$values || [];
    if (avaliacoes.length === 0) {
      return { nota: 0, total: 0 };
    }

    const mediaNota =
      avaliacoes.reduce((sum: number, av: any) => sum + av.nota, 0) /
      avaliacoes.length;
    return { nota: mediaNota, total: avaliacoes.length };
  };

  const lidarComContinuarParaPagamento = () => {
    const dataAtual = diasDisponiveis.find((d) => d.data === dataSelecionada);
    const avaliacoes = calcularMediaAvaliacoes();

    const urlFoto = "https://via.placeholder.com/150";

    const dadosAgendamento: DadosAgendamento = {
      professorId: professor.id,
      professorNome: professor.nome,
      professorAvatar: urlFoto,
      professorValorHora: valorHora,
      professorAvaliacao: avaliacoes.total > 0 ? avaliacoes : undefined,
      dataSelecionada,
      diaSemana: dataAtual?.diaSemana || "",
      horarioSelecionado,
      duracao,
      observacoes,
      precoTotal,
    };

    router.push("/checkout");
    setPasso(1);
    setDataSelecionada("");
    setHorarioSelecionado("");
    setObservacoes("");
  };

  const dataAtual = dataSelecionada
    ? diasDisponiveis.find((d) => d.data === dataSelecionada)
    : null;

  const urlFoto = "https://i.pravatar.cc/150?img=12";

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center space-x-4">
            {urlFoto && (
              <img
                src={urlFoto}
                alt={professor.nome}
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
              />
            )}
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Agendar Aula com {professor.nome}
              </h2>
              {valorHora > 0 && (
                <p className="text-blue-600 font-semibold">
                  R${valorHora.toFixed(2)}/hora
                </p>
              )}
            </div>
          </div>
          <button
            onClick={aoFechar}
            className="p-2 hover:bg-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4">
            <div
              className={`flex items-center space-x-2 ${
                passo >= 1 ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  passo >= 1
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200"
                }`}
              >
                {passo > 1 ? <Check className="w-4 h-4" /> : "1"}
              </div>
              <span className="font-medium hidden sm:inline">Data e Hora</span>
            </div>
            <div className="flex-1 h-px bg-gray-300 max-w-[60px]"></div>
            <div
              className={`flex items-center space-x-2 ${
                passo >= 2 ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  passo >= 2
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200"
                }`}
              >
                2
              </div>
              <span className="font-medium hidden sm:inline">Detalhes</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {passo === 1 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">
                    Escolha a Data
                  </h3>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>Disponibilidade do Professor:</strong> Os dias
                    destacados em azul possuem horários disponíveis
                  </p>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-2">
                  {nomesDiasAbrev.map((dia) => (
                    <div
                      key={dia}
                      className="text-center text-xs font-semibold text-gray-600 py-2"
                    >
                      {dia}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {diasDisponiveis.slice(0, 28).map((diaInfo) => {
                    const isSelected = dataSelecionada === diaInfo.data;
                    const isAvailable = diaInfo.temDisponibilidade;

                    return (
                      <button
                        key={diaInfo.data}
                        onClick={() => {
                          if (isAvailable) {
                            setDataSelecionada(diaInfo.data);
                            setHorarioSelecionado("");
                          }
                        }}
                        disabled={!isAvailable}
                        className={`
                          aspect-square rounded-lg border-2 transition-all relative
                          ${
                            isSelected
                              ? "border-blue-600 bg-blue-600 text-white shadow-lg scale-105"
                              : isAvailable
                              ? "border-blue-200 bg-blue-50 hover:border-blue-400 hover:bg-blue-100 text-blue-900"
                              : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                          }
                        `}
                      >
                        <div className="flex flex-col items-center justify-center h-full">
                          <span className="text-lg font-bold">{diaInfo.dia}</span>
                          <span className="text-xs">{diaInfo.mes}</span>
                        </div>
                        {isAvailable && !isSelected && (
                          <div className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {dataSelecionada && dataAtual && (
                <div className="border-t pt-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">
                      Horários Disponíveis
                    </h3>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-green-800">
                      <strong>
                        {dataAtual.diaSemana}, {dataAtual.dia} de{" "}
                        {dataAtual.mes}
                      </strong>{" "}
                      - Selecione um horário abaixo
                    </p>
                  </div>

                  {slotsDisponiveis.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {slotsDisponiveis.map((slot) => (
                        <button
                          key={slot.inicio}
                          onClick={() => setHorarioSelecionado(slot.inicio)}
                          className={`p-3 rounded-lg border-2 text-center transition-all ${
                            horarioSelecionado === slot.inicio
                              ? "border-blue-600 bg-blue-600 text-white shadow-md scale-105"
                              : "border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-700"
                          }`}
                        >
                          <div className="font-bold text-sm">{slot.inicio}</div>
                          <div className="text-xs opacity-75">{slot.fim}</div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Nenhum horário disponível para esta data
                    </div>
                  )}
                </div>
              )}

              {dataSelecionada && horarioSelecionado && (
                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setPasso(2)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    Continuar
                  </button>
                </div>
              )}
            </div>
          )}

          {passo === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Detalhes da Aula
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Duração da Aula
                    </label>
                    <select
                      value={duracao}
                      onChange={(e) => setDuracao(Number(e.target.value))}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value={30}>
                        30 minutos - R${((valorHora * 0.5).toFixed(2))}
                      </option>
                      <option value={60}>
                        1 hora - R${valorHora.toFixed(2)}
                      </option>
                      <option value={90}>
                        1h 30min - R${((valorHora * 1.5).toFixed(2))}
                      </option>
                      <option value={120}>
                        2 horas - R${((valorHora * 2).toFixed(2))}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Observações (opcional)
                    </label>
                    <textarea
                      value={observacoes}
                      onChange={(e) => setObservacoes(e.target.value)}
                      placeholder="Descreva o que você gostaria de focar na aula..."
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-3 text-lg">
                    Resumo do Agendamento
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span className="font-semibold">Data:</span>
                      <span>
                        {dataAtual?.diaSemana},{" "}
                        {new Date(dataSelecionada).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Horário:</span>
                      <span>{horarioSelecionado}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Duração:</span>
                      <span>{duracao} minutos</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Professor:</span>
                      <span>{professor.nome}</span>
                    </div>
                    <div className="border-t-2 border-blue-300 pt-2 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-base">Total:</span>
                        <span className="text-2xl font-bold text-blue-600">
                          R${precoTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setPasso(1)}
                  className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                >
                  Voltar
                </button>
                <button
                  onClick={lidarComContinuarParaPagamento}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  Continuar para Pagamento
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
